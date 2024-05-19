const express = require("express");
const productRoute = express.Router();
const { getProducts, getProductDetails } = require("../controllers/productController");

productRoute.get("/getAll", getProducts);
productRoute.get("/get/:id", getProductDetails);

module.exports = { productRoute };