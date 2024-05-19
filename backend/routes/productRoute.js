const express = require("express");
const productRoute = express.Router();
const { getProducts } = require("../controllers/productController");

productRoute.get("/getAll", getProducts);

module.exports = { productRoute };