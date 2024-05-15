const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    purchase: [
        {
            productId: { 
                type: Number,
            },
            productName: { 
                type: String,
            },
            size: {
                type: Number,
            },
            quantity: {
                type: Number,
            }
        }
    ],
    totalAmount: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('orders', orderSchema)