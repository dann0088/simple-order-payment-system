const express = require("express");
const orderRoute = express.Router();
const { createOrder, generateOrderInvoice } = require("../controllers/orderController");

orderRoute.post("/create/:sessionId", createOrder);
orderRoute.post("/invoice/:orderId", generateOrderInvoice);

module.exports = { orderRoute };