/* eslint-disable no-underscore-dangle */
// import { handle } from "express/lib/router";
import { getPaypalClientId, getOrder, payOrder } from "../api";
import CheckoutSteps from "../components/CheckoutSteps";

import { hideLoading, parseRequestUrl, rerender, showLoading, showMessage } from "../utils";


const addPaypalSdk = async (totalPrice) => {
    const clientId = await getPaypalClientId();
    // console.log(clientId); clientId is to be included in script.src for real payment
    showLoading();
    if (!window.paypal){
        const script = document.createElement('script');
        // script.type = 'text/javascript';
        // script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.src="https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=USD"; 
        script.components='data-sdk-integration-source="button-factory"';
        // script.src = 'https://www.paypalobjects/api/checkout.js';
        script.async = true;
        // script.debug = true;
        script.onload = () => {
            initPayPalButton(totalPrice);
        };
        document.body.appendChild(script);
    }else{
        initPayPalButton(totalPrice);
    }
};



  
 //  <script>
function initPayPalButton(totalPrice) {
    paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'paypal',
            
        },
        createOrder(data, actions) {
            return actions.order.create({
            purchase_units: [{"amount":{"currency_code":"USD","value":totalPrice}}]
            });
        },

        onApprove(data, actions) {
            return actions.order.capture().then((orderData) => {
            
            // Full available details
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            // here we send payment info to our server
            payOrder(parseRequestUrl().id, {
                orderID: data.orderID, // this is ID from paypal system
                payerID: data.payerID,
                paymentID: data.paymentID,
            })
            // Show a success message within this page, e.g.
            const element = document.getElementById('paypal-button-container');
            element.innerHTML = '';
            element.innerHTML = '<h3>Thank you for your payment!</h3>';
            
            showMessage('Payment was successful', () => {
               rerender(OrderScreen);  
            });
            

            // Or go to another URL:  actions.redirect('thank_you.html');
            
            });
        },

        onError(err) {
            console.log(err);
        }
        }).render('#paypal-button-container');
        hideLoading();
};
    // initPayPalButton();
  // </script>





const tutorial_handlePayment = (clientId, totalPrice) => {
    paypal.Buttons.render({
        env: 'sandbox',
        client: {
            sandbox: clientId,
            production: '',
        },
        /* locale: 'en_US', */
        style: {
            size: 'responsive',
            color: 'gold',
            shape: 'pill',
        },

        commit: true,
        payment(data, actions) {
            return actions.payment.create({
                transactions: [
                    {
                        amount: {
                            total: totalPrice,
                            currency: 'USD',
                        },
                    },
                ],
            });
        },
        onAuthorize(data, actions) {
            return actions.payment.execute().then(async () => {
                showLoading();
                // call pay order
                hideLoading();
                showMessage('Payment was successful', () => {
                    rerender(OrderScreen);
                });
            });
        }, 
    }, '#paypal-button'
    ).then (() => {
        hideLoading();
    } );
}


const OrderScreen = {

    after_render: ()=> {
        
        

    },

    render: async ()=> {

        const request = parseRequestUrl();
        const {
            _id,
            shipping,
            payment,
            orderItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            isDelivered,
            deliveredAt,
            isPaid,
            paidAt,
        } = await getOrder(request.id);

        if(!isPaid){
            addPaypalSdk(totalPrice);
        }

        return `
            <div>
                ${CheckoutSteps.render({step1: true, step2: true, step3: true, step4: true })}
                <h1>Order ${_id}</h1>
                <div class='order'>
                    <div class='order-info'>
                        <div>
                            <h2>Shipping</h2>
                            <div>
                                ${shipping.address}, ${shipping.city}, ${shipping.postalCode},
                                ${shipping.country}
                            </div>
                            ${ isDelivered 
                                ? `<div class='success'>Delivered at ${ deliveredAt }</div>`
                                : `<div class='error'>Not delivered</div>`}
                        </div>
                        <div>
                            <h2>Payment</h2>
                            <div>
                                Payment Method: ${payment.paymentMethod}
                            </div>
                            ${ isPaid
                                ? `<div class='success'>Paid: ${ paidAt }</div>`
                                : `<div class='error'>Not paid</div>`}
                        </div>
                        <div>
                            <ul class='cart-list-container'>
                                <li>
                                    <h2>Shopping Cart</h2>
                                    <div>Price</div>
                                </li>
                                ${
                                    orderItems.map(item => `
                                    <li>
                                        <div class='cart-image'>
                                            <img src='${item.image}' alt='${item.name}' />
                                        </div>
                                        <div class='cart-name'>
                                            <div>
                                                <a href='/#/products/${item.product}'>${item.name}</a>
                                            </div>
                                            <div>Qty: ${item.qty}</div>
                                        </div>
                                        <div class='cart-price'>
                                            $${item.price}
                                        </div>
                                    </li>
                                    `)
                                }
                            </ul>
                        </div>
                    </div>
                    <div class='order-action'>
                        <ul>
                            <li>
                                <h2>Order Summary</h2>

                            </li>
                            <li>
                                <div>Items</div><div>$${itemsPrice}</div>
                            </li>
                            <li>
                                <div>Shipping</div><div>$${shippingPrice}</div>
                            </li>
                            <li>
                                <div>Tax</div><div>$${taxPrice}</div>
                            </li>
                            <li class='total'>
                                <div>Order total</div><div>$${totalPrice}</div>
                            </li>
                            <li>
                                <div id="smart-button-container" class='fw'>
                                <div style="text-align: center;">
                                    <div id="paypal-button-container"></div>
                                </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        `

    },
};

export default OrderScreen;