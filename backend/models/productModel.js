const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = Schema({
    imageUrl: {
        type: String,
    },
    productName: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    productVariant: [
        {
            quantity: { 
                type: Number,
            },
            price: {
                type: Number,
            },
            size: {
                type: Number,
            }
        },
    ],
})

const Product = mongoose.model('products', productSchema)
module.exports = Product;