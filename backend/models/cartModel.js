const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = Schema({
    guestId: {
        type: String,
    },
    purchaseDetails: [
        {
            productId: { 
                type: Schema.Types.ObjectId, ref: 'products'
            },
            productName: {
                type: String
            },
            productImage: {
                type: String
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('carts', cartSchema)
module.exports = Cart;