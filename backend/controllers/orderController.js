const Order = require("../models/orderModel")
const short = require('short-uuid');

const createOrder = async(req, res) => {
    try {
        let body = req.body
        console.log(body)
        if (body.totalPaymentAmount < body.dummyMoney){
            throw new Error('insufficient funds');
        }
        // let purchaseDetails = JSON.parse(req.body.purchaseDetails);
        let purchaseDetails = req.body.purchaseDetails;
        const order = new Order({
            orderReceiptNumber  : short.generate(),
            customerEmail       : body.customerEmail,
            customerFullName    : body.customerFullName,
            customerAddress     : body.customerAddress,
            customerContact     : body.customerContact,
            purchaseDetails: purchaseDetails.map(details => {
                return {
                    productId       : details.productId,
                    productPrice    : details.productPrice,
                    size            : details.size,
                    orderQuantity   : details.orderQuantity,
                }
            }),
            paymentFee          : req.body.paymentFee,
            totalPaymentAmount  : req.body.totalAmount,
            isPaymentDone       : 1,     
        });

        await order.save();
        res.status(201).json({
            data: order,
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
