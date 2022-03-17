/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { apiUrl } from "./config";
import { getUserInfo } from "./localStorage";

export const getProduct = async(id) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-type':'application-json', 
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        };
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    };
};

export const signin = async ({email, password}) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email, 
                password,
            },
        });
        if (response.statusText !== 'OK'){
            throw new Error(response.data.message);
        };
        return response.data;
    } catch (err) {
        console.log(err.message);
        return {error: err.response.data.message || err.message};
        
    };
};

export const register = async ({userName, email, password}) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                userName,
                email, 
                password,
            },
        });
        if (response.statusText !== 'OK'){
            throw new Error(response.data.message);
        };
        return response.data;
    } catch (err) {
        console.log(err.message);
        return {error: err.response.data.message || err.message};
        
    };
};


export const update = async ({userName, email, password}) => {
    console.log(`start of api/update ${userName}`);
    const name = userName;
    try {
        const { _id, token } = getUserInfo();
    

        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                name,
                email, 
                password,
            },
        });
        console.log(`response in api: ${response.data}`);
        if (response.statusText !== 'OK'){
            throw new Error(response.data.message);
        };
        
        return response.data;
    } catch (err) {
        console.log(err.message);
        return {error: err.response.data.message || err.message};
        
    };
};


export const createOrder = async (order) => {
    try {
        const { token } = getUserInfo();
        // console.log(order);
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: order,
        });     
        if(response.statusText!=='Created'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.response
            ? err.response.data.message
            : err.message };
    }
    

};


export const getOrder = async (orderId) => {
    const { token } = getUserInfo();
    try {
        const response = await axios ({
            url: `${apiUrl}/api/orders/${orderId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });    
        if (response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.message };
    }
    
};


export const getPaypalClientId = async () => {
    const response = await axios({
        url: `${apiUrl}/api/paypal/clientId`,
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.statusText !== 'OK'){
        throw new Error(response.data.message);

    };
    return response.data.clientId;
};  


// this is called after successful payment
export const payOrder = async (orderId, paymentResult) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${orderId}/pay`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: paymentResult,
        });    
        if (response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.response ? err.response.data.message : err.message };
    }
    
};


export const getMyOrders = async () => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/mine`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK'){
            throw new Error(response.data.message);
        };
        return response.data;        
    } catch (err) {
        return { error: err.response ? err.response.data.message : err.message };
    }

};