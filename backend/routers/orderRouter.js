/* eslint-disable no-underscore-dangle */
import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel";
import { isAuth } from '../utils';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(async(req, res) => {
    console.log('start of post in orderRouter');
    const order = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice

    });
    const createdOrder = await order.save();
    res.status(201).send({ message: 'New order created', order: createdOrder });
}));

orderRouter.get('/:orderId', isAuth, expressAsyncHandler(async (req, res) => {
    console.log('start of get in orderRouter');
    if(req.params.orderId !== 'mine'){
        // return single order by id
        const order = await Order.findById(req.params.orderId);
        console.log(order);
        if(order){
            res.send(order);
        }else {
            res.status(404).send({ message: 'Order not found.'});
        }
    }else{
        // here we responde to '/orders/mine', return all orders of user
        const orders = await Order.find({ user: req.user._id });
        res.send(orders); 
    }
}));


orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment.paymentResult = {
            payerID: req.body.payerID,
            paymentID: req.body.paymentID,
            orderId: req.body.orderId,
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Order saved', order: updatedOrder });
    }else {
        res.status(404).send({ message: 'Order not found.'});
    }
}));


/* orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);

})); */

export default orderRouter;