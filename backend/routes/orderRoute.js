const express = require("express");
const orderRoute = express.Router();
const { createOrder } = require("../controllers/orderController");

orderRoute.post("/create/:sessionId", createOrder);

module.exports = { orderRoute };