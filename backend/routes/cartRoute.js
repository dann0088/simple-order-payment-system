const express = require("express");
const cartRoute = express.Router();
const { addCart, getCartList, deleteAllCart, countCartList } = require("../controllers/cartController");

cartRoute.post("/add/:sessionId", addCart);
cartRoute.get("/get/:sessionId", getCartList);
cartRoute.get("/count/:sessionId", countCartList);
// cartRoute.get("/getTotal/:sessionId", computeCartTotal);
cartRoute.delete("/delete/:sessionId", deleteAllCart);

module.exports = { cartRoute };