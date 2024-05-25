const { default: mongoose } = require("mongoose");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const short = require('short-uuid');
const { fetchCartList } = require("../controllers/cartController");

const createOrder = async(req, res) => {
    try {
        let shippingFree = 5; // static value made for this exercise only
        let orderData = req.body;
        let { sessionId } = req.params;
        console.log(sessionId);
        if (sessionId == null && sessionId == undefined) {
            throw Error("Session Id is missing");
        }

        let fetchCartResponse = await fetchCartList(sessionId);
        if (fetchCartResponse.message == "ERROR_FETCH_CART") {
            throw Error("Error fetching Cart list");
          }
        
        let totalAmount = fetchCartResponse.subtotal + shippingFree;
        if (totalAmount > orderData.dummyMoney){
            throw Error('insufficient funds');
        }
        console.log(fetchCartResponse.purchaseList);

        const order = new Order({
            orderReceiptNumber  : short.generate(),
            customerEmail       : orderData.customerEmail,
            customerFullName    : orderData.customerFullName,
            customerAddress     : orderData.customerAddress,
            customerContact     : orderData.customerContact,
            purchaseDetails: fetchCartResponse.purchaseList.map(details => {
                return {
                    productId       : details.productId,
                    productPrice    : details.productPrice,
                    size            : details.size,
                    orderQuantity   : details.orderQuantity,
                }
            }),
            totalPaymentAmount  : totalAmount,
            isPaymentDone       : 1,     
        });

        await order.save();
        res.status(201).json({
            data: {paymentId: order._id},
            message: "Order created successfully",
            status: 0,
        });
    } catch (error) {
        res.status(500).json({
            data: {},
            error: error.message,
            status: 1
        });
    }
}

module.exports = { createOrder }
