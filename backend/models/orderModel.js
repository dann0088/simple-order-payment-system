const mongoose = require("mongoose");
const { Schema } = mongoose;

// To Do add payment_order_status ??
const orderSchema = Schema({
    orderReceiptNumber: {
        type: String,
    },
    customerEmail: {
        type: String,
    },
    customerFullName: {
        type: String,
    },
    customerAddress: {
        type: String,
    },
    customerContact: {
        type: String,
    },
    purchaseDetails: [
        {
            productId: { 
                type: Schema.Types.ObjectId, ref: 'products'
            },
            productName: {
                type: String,
            },
            productPrice: {
                type: Number,
            },
            size: {
                type: Number,
            },
            orderQuantity: {
                type: Number,
            }
        }
    ],
    totalPaymentAmount: {
        type: Number,
    },
    shippingFee: {
        type: Number,
    },
    isPaymentDone: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('orders', orderSchema)
module.exports = Order;