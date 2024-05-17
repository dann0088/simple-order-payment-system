const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = Schema({
    totalAmount: {
        type: Number,
    },
    customerEmail: {
        type: String,
    },
    customerContact: {
        type: String,
    },
    method: {
        type: String,
    },
    paymentOrders: {
        type: Schema.Types.ObjectId, ref: 'orders'
    },
    isPaymentDone: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('payment', paymentSchema)
module.exports = Payment;