/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import { getProduct } from "../api";
import { parseRequestUrl, rerender } from "../utils";
import { getCartItems, setCartItems } from "../localStorage";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if(forceUpdate){  
        cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
        );
        // [].map(function) returns new array and applies function to all array items
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if(forceUpdate){
      rerender(CartScreen);
  }
  
};

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter(x => x.product !== id));
    // filter leaves items that are in condition
    if (id === parseRequestUrl().id) {
        document.location.hash = '/cart';

    }else{
        rerender(CartScreen);
    }
}

const CartScreen = {
  after_render: () => {
      const qtySelects = document.getElementsByClassName("qty-select");
      Array.from(qtySelects).forEach(qtySelect => {
          qtySelect.addEventListener('change', (e) => {
              const item = getCartItems().find((x) => x.product === qtySelect.id);
              addToCart({...item, qty: Number(e.target.value)}, true)
          });
          // because each <select> has id='item.product'
      });

      const deleteButtons = document.getElementsByClassName("delete-button");
      Array.from(deleteButtons).forEach(deleteButton => {
          deleteButton.addEventListener('click', () => {
              removeFromCart(deleteButton.id);
          });
      });

      document.getElementById('checkout-button').addEventListener('click', () => {
          document.location.hash = '/signin';
      });
  },

  render: async () => {
    const request = parseRequestUrl();
    // if id exist - user clicked on AddToCart, if not - user clicked on CartMenu //
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();
    return `
    <div class="cart content">
        <div class="cart-list">
            <ul class="cart-list-container">
                <li>
                    <h3>Shoppping cart</h3>
                    <div>Price</div>
                </li>
                ${
                    cartItems.length === 0 ? 
                    '<div>Cart is empty.<a href="/#/">Go shopping.</a></><div/>'
                    : cartItems.map(item => `
                    <li>
                        <div class="cart-image">
                            <img src="${item.image}" alt="${item.name}"></img>
                        </div>
                        <div class="cart-name">
                            <div>
                                <a href='/#/product${item.product}'>
                                    ${item.name}
                                </a>
                            </div>
                        
                            <div>
                                Qty:<select class="qty-select" id="${item.product}">
                                    ${
                                        [...Array(item.countInStock).keys()].map(x => item.qty === x+1
                                            ? `<option selected value="${x+1}">${x+1}</option>`
                                            : `<option value="${x+1}">${x+1}</option>`)
                                            
                                    }
                                </select>
                                <button type="button" class="delete-button" id="${item.product}">
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div class="cart-price">
                            $${item.price}
                        </div>
                    </li>
                    `).join('\n')
                }
            </ul>
        
        </div>
        <div class="cart-action">
            <h3>
                Subtotal (${cartItems.reduce((a , c) => a+c.qty, 0)} items):
                $${cartItems.reduce((accumulator, current) => accumulator + current.price * current.qty, 0)}
            </h3>
            <button id="checkout-button" class="primary fw">
                Proceed to checkout
            </button>
        </div>
    </div> 
        `;
  },
};

export default CartScreen;
