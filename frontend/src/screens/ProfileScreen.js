/* eslint-disable no-undef */
// import { text } from "body-parser";
import { getMyOrders, update } from "../api";
import { getUserInfo, setUserInfo, signOutUser } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";


/* eslint-disable arrow-body-style */
const ProfileScreen = {
    after_render: () => {

        document.getElementById('profile-form').addEventListener('submit', 
        async (submEvent) => {
            const newName = document.getElementById('name').value;
            // console.log(document.getElementById('name').value);
            const newEmail = document.getElementById('email').value;
            const newPassword = document.getElementById('password').value;

            submEvent.preventDefault();
            const txt = `Update: ${newName}, ${newEmail}, ${newPassword}?`;
            if(confirm(txt) === true){
            // call loading overlay before await function, hide after it
                showLoading();
                const data = await update({
                    userName: newName,
                    email: newEmail,
                    password: newPassword,
                });
                hideLoading();
                if(data.error){
                    // alert(data.error);
                    showMessage(data.error);
                }else{
                    // save user info
                    setUserInfo(data);
                    console.log('saved info: ');
                    console.log(data);

                    // document.location.hash = '/';
                }
            };
        });

        document.getElementById('signout-button').addEventListener('click', () => {

            // confirm("Sign out?");
            if(confirm('Sign out?') === true){
                signOutUser();
                document.location.hash='/';
            }
            

        });
        

    },

    render: async () => {
        const { name, email } = getUserInfo();
        if( !name ){
            // we dont need to show this screen
            console.log('user name doesnt exist');
            document.location.hash = '/';
        }
        const orders = await getMyOrders();

        return `
            <div class='content profile'>
                <div class='profile-info'>
                    <div class='form-container'>
                        <form id='profile-form'>
                            <ul class='form-items'>
                                <li><h1>User Profile</h1></li>
                                <li>
                                    <label for='name'>Name</label>
                                    <input type='name' name='name' id='name' value='${name}'/>
                                </li>
                                <li>
                                    <label for='email'>Email</label>
                                    <input type='email' name='email' id='email' value='${email}'/>
                                </li>
                                <li>
                                    <label for='password'>Password<label>
                                    <input type='password' name='password' id='password' />
                                </li>
                                
                                <li>
                                    <button type='submit' class='primary'>Update</button>
                                </li>
                                <li>
                                    <button type='button' id='signout-button'>Sign out</button>
                                </li>
                                
                            </ul>

                        </form>
                    
                    </div>
                </div>
                <div class='profile-orders'>
                    <h2>Order history</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.length === 0 
                                ? `<tr><td colspan="6">No order found</tr>`
                                : orders.map(
                                    (order) => `
                                    <tr>
                                        <td>${order._id}</td>
                                        <td>${order.createdAt}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>${order.paidAt || 'No'}</td>
                                        <td>${order.deliveredAt || 'No'}</td>
                                        <td><a href="/#/order/${order._id}">Details</a></td>
                                    </tr>
                                    `).join('\n')
                            }
                        </tbody>
                    </table>
                </div>
            </div>


        `
    },
};
export default ProfileScreen;