https://www.youtube.com/watch?v=N3FDyheHVMM&list=PLEajilVnIQKuUb9jFzbFxeNk6QAKirVS1
JS Amazona

user01@example.com
pass01

 1. Create folder structure
    1. root folder jszamazona
    2. frontend and backend folders
    3. src folder in frontend
    4. index.html in src
    download node.js installer
    5. go to frontend dir, run: npm init
    6. npm install -D live-server    #-D for Development
    7. add in package.json file->scripts:
        "start": "live-server src --verbose",
    8. run: npm start

 2. Design website
    1. create style.css
    2. link style.css to index.html
        before title in <head>: 
        <link rel="stylesheet" href="style.css" />
    3. create div.grid-container
        in <body>: <div class="grid-container">
    4. create header, main and footer
    5. style html, body 
        *{} in css - to all elements
    6. style grid-container, header, main, footer
 3. Create static homescreen
    1. cleate ul.products
    2. create li
    3. create div.product
    4. add .product-image, .product-name, .product-brand, .product-price
    5. style ul.products and internal divs
    6. duplicate 2 times to show 3 products

 4. render dymanic homescreen
    1. create data.js
    2. export an array of 6 products
    3. create screens/HomeScreen.js
    4. export HomeScree as an object with render() method
    5. implement render()
    6. import data.js
    7. return products mapped to li inside ul
    8. create app.js
    9. link it to index.html as module
        add in index.html/head: <script type="module" src="app.js"></script>
    10. set <main> id='main-container' 
    11. create router() function in app.js
    12. set main_container innerHTML to HomeScreen.render()
    13. set load event of window to router() function in app.js
    ------time 55.10

 5. Build url router
    1. create const routes as route:screen object for home screen in app.js
    2. create utils.js:
    3. add export parseRequestURL()
    4. set url as hash address split by slash
    5. return resource, id and verb of url
    6. update router() in app.js
    7. set request  as parseRequestURL()
    8. build parseUrl and compare with routes
    9. if route exists render it, else render Error404
    10. create screens/Error404.js and render error message
1.05

 6. create node.js server
    1. run npm init in root jamazona folder
    2. npm install express
    3. create server.js
    4. add start command in package.json (root folder)
        as node backend/server.js
    5. require express
    6. move data.js to backend
    7. create route for /api/products
    8. return products in data.js
    9. run npm start

    http://localhost:5000/api/products - json with products
1.14

 7. Load products from backend
    npm start must be from root ans frontend folders both
    1. edit HomeScreen.js:
    2. make render async
    3. fetch products from /api/products in render() in (HomeScreen.js)
    4. make router() async and call await HomeScreen.render()  -- in app.js
    5. use cors on backend:
        in root folder run 
        npm install cors
        in server.js: const cors = require('cors');
        stop - start server : /backend$ npm start
1.21

 8. Add Webpack
    1. cd frontend
    2. npm install -D webpack webpack-cli webpack-dev-server
    npm install webpack-dev-server --save-dev
    3. npm uninstall live-server
    4. add in frontend package.json: "serve": "webpack serve",

    (not "start": "webpack-dev-server --watch-content-base --open")
    5. move index.html, style.css, images to frontend folder
    6. rename app.js to index.js
    7. update index.html
    8. add <script src="main.js"></script> before </body>
         create webpack.config.js, paste code in it (found in internet, entry: "./src", 
         __dirname, './')
    9. root: npm start, frontend: npm run serve
    (npx webpack-dev-server,    npx webpack serve)
    10. frontend: npm install axios
    11. change fetch to axios in HomeScreen
1.31

 9. Install Babel for ES6 syntax
    1. stop all servers, then from root folder: 
      npm install -D @babel/core @babel/cli @babel/node @babel/preset-env

      npm install @babel/node
      npm install @babel/cli
      npm install @babel/core
    2. Create configuration file .babelrc in root folder and set presets to @babel/preset-env
    3. npm install -D nodemon
    it monitors changes in server.js and applies then instantly
    4. in root/package.json:
    set "start": "nodemon --watch backend --exec babel-node backend/server.js"
    5. convert require to import in server.js
    convert 'module.exports' to 'export default' in data.js
    6. npm start
    7. to help find errors in code, in root folder:
    npm install eslint 
    install extension for VSCode: eslint
    8. in root folder create .eslint.rc.js 
    9. npm install -D eslint-config-airbnb-base eslint-plugin import
    now it shows errors in js code
1.47

 11. intall VSCode ext:
    javascript ES6 code snippets
    ES7 react/reduxGraphQL/React-native snippets
    npm install -D eslint-config-prettier
    Prettier - Code formater
    HTML&LESS grammar injections
    CSS Peek

1.52     
 12. Creatin rating component
    1. src/components/Rating.js
    2. create div.rating
    3. link to fontawesome.css in index.html before style.css
    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    4. define Rating object in render()
    5. if !prop.value  return empty div
    6. else use fa fa-star, fa-start-half-o, fa-star-o
    7. last span for props.text || ''
    8. style div rating, span and last span
    9. edit HomeScreen.js
    10. add div.product-rating and use Rating component
2.05
 13. Product screen
    1. get product id from request in ProductScreen.js
    create api.js, config.js   in /src/
    2. implement api/product/:id api  in server.js
    3. send Ajax request to product api.js, config.js (here is address to backend)
2.18
 14. 
    4. create back to result link
    5. create div details with 3 columns
    6. 1 product image
    7. 2 product info
    8. 3 form product action
    9. style .details and all columns
2.31
 15. 
    10. create add-to-card button with add-button id
    in ProductScreen.js
    11. after_render() to add event  to the button
    12. redirect user to cart/:product_id
2.38
 16. Add to cart action
    1. CartScreen.js, create route to it in index.js
    2. parseRequestUrl()
    3. getProduct(request.id)
    4. addToCart
    5. create localStogage.js in /src/ ,  getCartItems() 
    6. cartItems.find
    7. if existItem update qty
    8. else add item
    9. setCartItems
2.53
 17. cart screen UI
    1. cartItems = getCartItems()

    2. 2 columns for cart items ans cart actions
    3. cartItems.length ===0 ? cart is empty
    4. show item image, name, qty, price
    5. cart action
    6. subtotal
    7. proceed to checkout button
    8. add css style
3.10
 18. Update and delete cart items
    1. add qty select next to each item
    2. after_render()
    3. add change event to qty select
    4. getCartItems() and pass to addToCart()
    5. set force to true  to addToCart()
3.23
sudo apt-get install -y mongodb-org
 19. install mongodb and connect admin user
    1. root folder:    npm install mongoose 
    2. connect to mongodb  in server.js
    3. create config.js in /backend
    4. root/:     npm install dotenv
    create file:   root/.env  , 
    5. add url in it: export PORT and MONGODB_URL
    in config.js import dotenv
    To start mongodb on linux system:
 3.33   __________________________________
    sudo systemctl start mongod

    on windows: in Services

    6. create backend/models/userModel.js  
    7. create userSchema and userModel
    8. create backend/routers/userRouter.js
    server.js -- app.use('/api/users', userRouter)
    9. create createadmin route in userRouter.js
 20. Sign-in screen UI
    1. create frontend/screens/signinScreen.js
    2. render email and password fields
    3. style signin form
3.54
 21. signin screen backend
    1. after-render handle form submit
    2. create signin request in frontend
    3. create signin api in backend
    4. create route for api/users/signin
    5. check username and passw, to be able to read request body:
    npm install body-parser, 
    in server.js:
    import bodyParser from 'body-parser'
    6. if not, send 401error, 
    
    7. npm install express-async-handler
    in userRouter.js import expressAsyncHandler
    8. wrap expressAsyncHandler our .post and .get functions
    9. add error middleware in server.js before app.listen
    10. install Postman
    11. send post request to  localhost:5000/api/users/signin
    12. test with invalid passw
            {
            "email":"ddsghhj",
            "password":"6785676"
            }
    13. generate token
    14. npm install jsonwebtoken
        create backend/utils.js
    15. set config.JWT_SECRET to somethingsecret
    16. add generateToken to utils.js
    17. return token
    18. test with correct passw
            "email":"admin@example.com",
            "password":"js"
4.10
 22. create header component
      create components/Header.js
    1. update index.html : cut header content and paste in Header.js/render
    add header const in index.js
    2. add header render and after_render to router function
    3. show header menu  based on user logged in or not
4.22
 23. create progress indicator and Alert component
    1. create overlay loading div in index.html
    2. style overlay loading
    3. create utils.js/showLoading() func 
    4. set loading-overlay classList.add('active')
    5. create hideLoading()  - call them in signinScreen.js
    6. create overlay message div in index.html
    7. add style overlay mess
    8. create showMessage(message, callback)
    9. document message-overlay set inner HTML
    10. div id message-overlay-content
    11. show message
    12. button id, OK, class active, event listener 
4.36

 24. register screen
    1. RegisterScreen.js - copy from  signinScreen.js
    2. add form elements (name, re-enter password)

    3. after_render handle form submit, 
    4. create register request in frontend
    5. create register api in backend
4.46
 25. profile screen
    1. profileScreen.js  copy from RegisterScreen.js
    2. add form elements
    3. after_render() handle form submit
    duplicate api.js/register() --> register()
    now method = PUT
    duplicate '/register' POST in userRouter.js, convert to PUT '/:id'
    4. create profile update request in frontend
    5. profile update() api in backend 

    6. create middleware isAuth() in utils.js and use in update profile
    7. implement sign out
5.06

 
 26. create Checkout wizard header component
    1. create components/CheckoutSteps.js
    2. div elements for steps 1 to 4
    3. utils.js/redirectUser()
    4. copy profileSreen as shippingScreen
    5. use CheckoutSteps
    6. define getShipping() and setShipping()
    7. copy shippingScreen and save as paymentScreen
    8. define getPayment() and setPayment()
    9. redirect user to PlaceOrder.js
5.32

 27. PlaceOrderScreen.js     UI
5.52
 28. placeOrderScreen action
    1. handle button click
    2. createOrder() api
    3. create models/orderModel.js
    4. create routers/orderRouter.js,  app.use() it in server.js
    5. create 'post' orderRouter
6.11
 29. OrderScreen.js ---copy from placeOrderScreen
    add api.js/getOrder()
    add to index.js
    add GET to orderRouter.js
6.26
 30. Paypal
    1. get client id from Paypal
    developer.paypal.com/developer/application
    sandbox
    create app
    name=jsamazona
    copy client ID
    2. set it in .env file, in config.js
    3. in server.js create route form /api/paypal/clientId

    4. create getClientPaypalId() in app.js
    5. add paypal checkout script in OrderScreen.json
    6. show paypal button - use paypal site
    7. update order after payment 
    8. create payOrder() in app.js
    9. create route for /:id/pay in orderRouter.js
    10. rerender after pay order

add in webpack.config.js:

    resolve: {
    fallback: { "url": require.resolve("url/") }
}

run: npm install url

6.52
 31. display customer OrderScreen
    1. create customer orders api
    orderRouter get 
    2. show orders in profile screen
    3. create api for getMyOrders()
    4. style
7.05
 32. admin dashboard UI
    1. create Admin order menu in Header.js
    2. if user is admin show dashboard
    3. create dashboard screen
7.18
    4. create dashboard menu
    5. style dashboard

    2. create ProductListScreen
    3. show product with edit and delete buttons
    4. show create product buttons
    5. create product backend
    6. redirect user to edit product screen


