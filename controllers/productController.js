const Product = require("../models/productModel")

const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(201).json({
            data: products,
            message: "Successfully get all product!",
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

module.exports = { getProducts }