/* eslint-disable no-underscore-dangle */
// import data from '../data.js'
import axios from 'axios';
import Rating from '../components/Rating';
import { hideLoading, showLoading } from '../utils';

const HomeScreen = {
    after_render: () => {

    },

    render: async () => {
        // const { products } = data; #this is importing from frontend

        // get data from server
        showLoading();
        const responce = await axios({
            url: 'http://localhost:5000/api/products',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        hideLoading();
        if (!responce || responce.statusText !== 'OK') {
            return '<div>Error in getting data</div>';
        }
        const products = responce.data; // here we if responce is ok

        return `
            <ul class='products'>
                ${products.map((product) => `
                <li>
                    <div class="product">
                        <a href="/#/product/${product._id}">
                            <img src='${product.image}' alt="${product.name}"></img>                            
                        </a>
                        <div class="product-name">
                            <a href="/#/product/${product._id}">
                                ${product.name}
                            </a>
                        </div>
                        <div class='product-rating'>
                            ${Rating.render({
                                value: product.rating,
                                text: `${product.numReviews} reviews`,
                            })}
                        </div>
                        <div class="product-brand">
                            ${product.brand}
                        </div>
                        <div class="product-price">
                            $${product.price}
                        </div>
                    </div>
                </li>
                `)
                .join('\n') // to remove comma between li
            }
        `;
    },
};
export default HomeScreen;
