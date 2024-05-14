const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({path:".env"})
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'

const app = express();

app.use(cors())
app.use(express.json());
app.get("/", async(req, res) => {
    res.send("Hello World");
});


app.listen(PORT, HOST, () => {
    console.log(
        `Server running in ${HOST} mode on port ${PORT}`
    );
})

connectDB();