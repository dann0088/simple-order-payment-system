const Order = require("../models/orderModel")

const createOrder = async(req, res) => {
    try {
        // let purchaseDetails = JSON.parse(req.body.purchaseDetails);
        let purchaseDetails = req.body.purchaseDetails;
        const order = new Order({
            orderReceiptNumber  : req.body.orderReceiptNumber,
            customerFullname    : req.body.customerFullname,
            customerEmail       : req.body.customerEmail,
            customerAddress     : req.body.customerAddress,
            purchase: purchaseDetails.map(details => {
                return {
                    productId       : details.productId,
                    productPrice    : details.productPrice,
                    size            : details.size,
                    orderQuantity   : details.orderQuantity,
                }
            }),
            totalAmount : req.body.totalAmount,
            status      : 0,     
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
