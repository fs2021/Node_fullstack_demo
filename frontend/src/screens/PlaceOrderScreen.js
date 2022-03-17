/* eslint-disable no-underscore-dangle */
import { createOrder } from "../api";
import CheckoutSteps from "../components/CheckoutSteps";
import { cleanCart, getCartItems, getPayment, getShipping } from "../localStorage";
import { showLoading, hideLoading, showMessage } from "../utils";

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if(orderItems.length === 0){
        document.location.hash = '/cart';
    }else{
        const shipping = getShipping();
        if(!shipping.address){
            document.location.hash = '/shipping';
        }else{
            const payment = getPayment();
            if(!payment.paymentMethod){
                document.location.hash = '/payment';
            }else{
                // here we are all ok
                const itemsPrice = orderItems.reduce((accum, current) => 
                accum + current.price*current.qty, 0);

                // just simplified shipping price, $10 if price is less than $100
                const shippingPrice = itemsPrice > 100
                    ? 0 
                    : 10;
                
                const taxPrice = Math.round(itemsPrice * 0.15 * 100) / 100;

                const totalPrice = itemsPrice + shippingPrice + taxPrice;

                return {
                    orderItems,
                    shipping,
                    payment,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                };

            };
        };
    };
};

const PlaceOrderScreen = {

    after_render: ()=> {
        document.getElementById('placeorder-button')
        .addEventListener('click', async () => {
            const order = convertCartToOrder();
            showLoading();
            const data = await createOrder(order);
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                // if items added to order, we can clear the cart in localstorage
                cleanCart();
                document.location.hash = `/order/${  data.order._id }`;
                
            }
        });
        

    },

    render: ()=> {

        const {
            orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = convertCartToOrder();

        return `
            <div>
                ${CheckoutSteps.render({step1: true, step2: true, step3: true, step4: true })}

                <div class='order'>
                    <div class='order-info'>
                        <div>
                            <h2>Shipping</h2>
                            <div>
                                ${shipping.address}, ${shipping.city}, ${shipping.postalCode},
                                ${shipping.country}
                            </div>
                        </div>
                        <div>
                            <h2>Payment</h2>
                            <div>
                                Payment Method: ${payment.paymentMethod}
                            </div>
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
                            <li><button id='placeorder-button' class='primary fw'>Place Order</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        `

    },
};

export default PlaceOrderScreen;