const { default: mongoose } = require("mongoose");
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

const getProductDetails = async(req, res) => {
    try {
        let {id} = req.params;
        if (id == null && id == undefined) {
            throw Error("Product Id is missing");
        }
        const product = await Product.findById(id);
        res.status(201).json({
            data: product,
            message: "Successfully get product details",
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

const updateProductQuantity = async(purchaseList) => {
    for (const item of purchaseList) {
        let itemObjectId = item.productId;
        console.log(itemObjectId);
        try {
            const updateResponse = await Product.updateOne(
                { _id: itemObjectId, "productVariant.size": item.size },
                { $inc: { "productVariant.$.quantity": -item.orderQuantity } }
            );
            console.log(updateResponse);
        } catch (err) {
            console.error(err);
            throw new Error(err);
        }
    }
}

module.exports = { getProducts, getProductDetails, updateProductQuantity }