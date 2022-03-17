/* eslint-disable no-underscore-dangle */
import express from "express";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/userModel";
import { generateToken, isAuth } from "../utils";

const userRouter = express.Router();

// create admin with Postman: GET localhost:5000/api/users/createadmin
userRouter.get('/createadmin', expressAsyncHandler(async(req, res) => {
    try {
        const user = new UserModel({
            name: 'admin',
            email: 'admin@example.com',
            password: 'js',
            isAdmin: true,
        });
        const createdUser = await user.save();
        res.send(createdUser);
    } catch (error) {
        res.status(500).send({message: error.message});
        
    }
}));

userRouter.post('/register', expressAsyncHandler(async(req, res) => {
    try {
        const newuser = new UserModel({
            name: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            
        });
        const createdUser = await newuser.save();
        if (!createdUser){
            res.status(401).send({
                message: 'Invalid User data'
            });
        }else{
            res.send({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                isAdmin: createdUser.isAdmin,
                token: generateToken(createdUser),
            })
        }
        // res.send(createdUser);
    } catch (error) {
        res.status(500).send({message: error.message});
        
    }
    
    
}));


userRouter.post('/signin', expressAsyncHandler(async(req, res) => {
    console.log('start of router signin');
    const signinUser = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password,
    });

    if (!signinUser){
        res.status(401).send({
            message: 'Invalid Email or Password'
        });
    }else{
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: generateToken(signinUser),
        });
    };
}));


userRouter.put(
    '/:id', 
    isAuth,
    expressAsyncHandler(async(req, res) => {    
    console.log(`start of put ${req.body.userName}`);
    try {
        
        const existingUser = await UserModel.findById(req.params.id);
        if (!existingUser){
            res.status(404).send({
                message: 'User not found'
            });
        }else{
            console.log(`User ${existingUser.name} exists, can update`);
            existingUser.name = req.body.userName || existingUser.name;
            existingUser.email = req.body.email || existingUser.email;
            existingUser.password = req.body.password || existingUser.password;


            const updatedUser = await existingUser.save();
            // pass to frontend and generate new token
            res.send({

                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            })
        }
        // res.send(createdUser);
    } catch (error) {
        res.status(500).send({message: error.message});
        
    }
    
    
}));


export default userRouter;