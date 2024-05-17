const mongoose = require("mongoose");
const { Schema } = mongoose;

// To Do add payment_order_status ??
const orderSchema = Schema({
    orderReceiptNumber: {
        type: Number,
    },
    customerFullName: {
        type: String,
    },
    customerEmail: {
        type: String,
    },
    customerAddress: {
        type: String,
    },
    purchase: [
        {
            productId: { 
                type: Schema.Types.ObjectId, ref: 'products'
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
    totalAmount: {
        type: Number,
    },
    status: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('orders', orderSchema)
module.exports = Order;