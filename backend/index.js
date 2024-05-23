const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({path:".env"})
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");

const { orderRoute } = require("./routes/orderRoute.js");
const { productRoute } = require("./routes/productRoute.js");
// const { paymentRoute } = require("./routes/paymentRoute.js");

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'

const app = express();

app.use(cors())
app.use(express.json());

app.get("/", async(req, res) => {
    res.send("Hello World");
});

app.use("/order", orderRoute);
app.use("/product", productRoute);
// app.use("/payment", paymentRoute);

app.listen(PORT, HOST, () => {
    console.log(
        `Server running in ${HOST} mode on port ${PORT}`
    );
})

connectDB();