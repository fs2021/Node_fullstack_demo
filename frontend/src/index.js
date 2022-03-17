import Header from './components/Header.js';
import CartScreen from './screens/CartScreen.js';
import Error404Screen from './screens/Error404Screen.js';
import HomeScreen from './screens/HomeScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import SigninScreen from './screens/signinScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen.js';
import { hideLoading, parseRequestUrl, showLoading } from './utils.js';
import DashboardScreen from './screens/DashboardScreen.js';

// key is url and value is screen
// :id - is placeholder for id
const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/order/:id': OrderScreen,
  '/dashboard': DashboardScreen

};

const router = async () => {
  showLoading();
  const request = parseRequestUrl();

  const parseUrl = (request.resource ? `/${request.resource}` : '/')
        + (request.id ? '/:id' : '')
        + (request.verb ? `/${request.verb}` : '');
    // console.log(parseUrl);

  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  // if we use async method render(), we put await
  if(screen.after_render) await screen.after_render();
  hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
