const Payment = require("../models/paymentModel");
const short = require('short-uuid');

const createPayment = async(req, res) => {
    try {
        const payment = new Payment({
            invoiceId       : short.generate(),
            customerEmail       : req.body.customerEmail,
            customerContact     : req.body.customerContact,
            method              : req.body.method,
            paymentOrders       : req.body.orderId,
            isPaymentDone       : true, // just for this exercise
            totalAmount         : req.body.totalAmount,   
        });

        await payment.save();
        res.status(201).json({
            data: order,
            message: "Payment created successfully",
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

module.exports = { createPayment }
