const express = require("express");
const orderRoute = express.Router();
const { addCart, getCartList } = require("../controllers/cartController");

orderRoute.post("/addCart", addCart);
orderRoute.get("/getCart", getCartList);

module.exports = { orderRoute };