const express = require("express");
const orderRoute = express.Router();
const { createOrder } = require("../controllers/orderController");

orderRoute.post("/create", createOrder);

module.exports = { orderRoute };