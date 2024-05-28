const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({path:".env"})
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");

const { orderRoute } = require("./routes/orderRoute.js");
const { productRoute } = require("./routes/productRoute.js");
const { cartRoute } = require("./routes/cartRoute.js");
// const { paymentRoute } = require("./routes/paymentRoute.js");

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

connectDB();
const checkDBConnection = (req, res, next) => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState !== 1) {
        return res.status(503).json({
            message: 'Service Unavailable, Please try again later.',
        });
    }

    next();
}
app.use(checkDBConnection);

app.get("/", async(req, res) => {
    res.send("Hello World");
});

app.use("/order", orderRoute);

app.use("/product", productRoute);

app.use("/cart", cartRoute);

/* To disconnect mongoDB client (this is for testing only)
 disable reconnect functionality in config/db.js before testing this
 to avoid reconnecting
 */
app.get('/disconnect', (req, res) => {
    mongoose.disconnect();
    console.log('MongoDB connection manually closed');
    res.send('MongoDB connection manually closed');
  });
  
app.listen(PORT, HOST, () => {
    console.log(
        `Server running in ${HOST} mode on port ${PORT}`
    );
})

