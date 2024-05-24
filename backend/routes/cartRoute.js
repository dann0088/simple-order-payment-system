const express = require("express");
const cartRoute = express.Router();
const { addCart, getCartList, deleteAllCart } = require("../controllers/cartController");

cartRoute.post("/add/:sessionId", addCart);
cartRoute.get("/get/:sessionId", getCartList);
cartRoute.delete("/get/:sessionId", deleteAllCart);

module.exports = { cartRoute };