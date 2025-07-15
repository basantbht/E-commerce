import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing orders using COD method
const placeOrder = async (req,res) => {
    try {

        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData: {}});

        res.json({success: true, message: "Order Placed"})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})

    }

}

// Placing orders using stripe method
const placeOrderStripe = async (req,res) => {

    const {userId, items, amount, address} = req.body;

    
}

// All orders data form Admin panel
const allOrders = async (req,res) => {

    try {

        const orders = await orderModel.find({});
                
        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }

}

// User order data for frontend
const userOrders = async (req,res) => {

    try {
        const {userId} = req.body;

        const orders = await orderModel.find({ userId });

        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }

}

// update user status from Admin panel
const updateStatus = async (req,res) => {

    try {
        const {orderId , status} = req.body;

        await orderModel.findByIdAndUpdate(orderId, {status});

        res.json({success: true, message: "Status Updated"});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }

}

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus}


