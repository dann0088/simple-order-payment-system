const { default: mongoose } = require("mongoose");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const short = require('short-uuid');

// const validateProduct = async(p_purchaseDetails) => {
//     let ids = [];
//     p_purchaseDetails.map(details => {
//         ids.push(details.productId)
//     }),
//     console.log(">>>>> ", p_purchaseDetails)
//     try {
//         const products = await Product.find({ '_id': { $in: ids } });
//         // console.log(products)
//         return products[0]._id;
//         // res.status(201).json({
//         //     data: products,
//         //     message: "Successfully get all product!",
//         //     status: 0,
//         // });
//     } catch (error) {
//         res.status(500).json({
//             data: {},
//             error: error.message,
//             status: 1
//         });
//     }
// } 

const createOrder = async(req, res) => {
    try {
        let body = req.body
        if (body.totalPaymentAmount > body.dummyMoney){
            throw new Error('insufficient funds');
        }

        // let purchaseDetails = JSON.parse(req.body.purchaseDetails);
        let purchaseDetails = req.body.purchaseDetails;
        if (purchaseDetails.length <= 0) {
            throw new Error('no product(s) found');
        }
        // let product = await validateProduct(purchaseDetails);
 
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
            data: order._id,
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
