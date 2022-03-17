/* eslint-disable no-undef */
import CheckoutSteps from "../components/CheckoutSteps";
import { getUserInfo, getShipping, setShipping } from "../localStorage";


/* eslint-disable arrow-body-style */
const ShippingScreen = {
    after_render: () => {

        document.getElementById('shipping-form').addEventListener('submit', 
        async (submEvent) => {
            let newCity = document.getElementById('city').value;
            // console.log(document.getElementById('name').value);
            let newAddress = document.getElementById('address').value;
            let newPostal = document.getElementById('postalCode').value;
            let newCountry = document.getElementById('country').value;

            submEvent.preventDefault();
            let txt = `Continue: ${newAddress}, ${newCity}, ${newPostal}?`;
            if(confirm(txt) == true){
            
                setShipping({
                    address: newAddress,
                    city: newCity,
                    postalCode: newPostal,
                    country: newCountry,
                });
                
                console.log('saved shipping');
                document.location.hash = '/payment';
                
            };
        });
             

    },

    render: () => {
        const { name } = getUserInfo();
        if( !name ){
            // we dont need to show this screen
            console.log('user name doesnt exist');
            document.location.hash = '/';
        }
        const { address, city, postalCode, country } = getShipping();

        return `
            ${CheckoutSteps.render({step1: true, step2: true})}
            <div class='form-container'>
                <form id='shipping-form'>
                    <ul class='form-items'>
                        <li><h1>Shipping</h1></li>
                        <li>
                            <label for='address'>Address</label>
                            <input type='text' name='address' id='address' value='${address}'/>
                        </li>
                        <li>
                            <label for='city'>City</label>
                            <input type='text' name='city' id='city' value='${city}'/>
                        </li>
                        <li>
                            <label for='postalCode'>Postal code</label>
                            <input type='text' name='postalCode' id='postalCode' value='${postalCode}'/>
                        </li>
                        <li>
                            <label for='country'>Country</label>
                            <input type='text' name='country' id='country' value='${country}'/>
                        </li>
                        
                        
                        <li>
                            <button type='submit' class='primary'>Continue</button>
                        </li>
                        
                        
                    </ul>

                </form>
            
            </div>

        `
    },
};
export default ShippingScreen;