/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import jwt from "jsonwebtoken";
import config from "./config";

/* eslint-disable import/prefer-default-export */
export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
    );
};

export const isAuth = (req, res, next) => {
    console.log('start of utils Auth')
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        res.status(401).send({message: 'Token not supplied'});
    }else {
        const token = bearerToken.slice(7, bearerToken.length);
        jwt.verify(token, config.JWT_SECRET, (err, data) => {
            if(err){
                res.status(401).send({message: 'Invalid token'});
                
            }else{
                req.user = data;
                next();
                // next is function, that will run if all is ok
            };
        });
    };
};