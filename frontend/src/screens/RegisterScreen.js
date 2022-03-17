/* eslint-disable no-undef */
import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";


/* eslint-disable arrow-body-style */
const RegisterScreen = {
    after_render: () => {

        document.getElementById('register-form').addEventListener('submit', 
        async (submEvent) => {
            console.log(document.getElementById('name').value);

            submEvent.preventDefault();
            // call loading overlay before await function, hide after it
            showLoading();
            const data = await register({
                userName: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            hideLoading();
            if(data.error){
                // alert(data.error);
                showMessage(data.error);
            }else{
                // save user info
                setUserInfo(data);
                redirectUser();
                // document.location.hash = '/';
            }

        });

    },

    render: () => {
        if(getUserInfo().name){
            // we dont need to sign in
            console.log('user name exists');
            redirectUser();
            // document.location.hash = '/';
        }

        return `
            <div class='form-container'>
                <form id='register-form'>
                    <ul class='form-items'>
                        <li><h1>Create Account</h1></li>
                        <li>
                            <label for='name'>Name</label>
                            <input type='name' name='name' id='name' />
                        </li>
                        <li>
                            <label for='email'>Email</label>
                            <input type='email' name='email' id='email' />
                        </li>
                        <li>
                            <label for='password'>Password<label>
                            <input type='password' name='password' id='password' />
                        </li>
                        <li>
                            <label for='repassword'>Re-enter Password<label>
                            <input type='password' name='repassword' id='repassword' />
                        </li>
                        <li>
                            <button type='submit' class='primary'>Register</button>
                        </li>
                        <li>
                            <div>
                                Already have an account?
                                <a href='/#/signin'>Sign-In</a>
                            </div>
                        </li>
                    </ul>

                </form>
            
            </div>

        `
    },
};
export default RegisterScreen;