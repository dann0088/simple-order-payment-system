const { default: mongoose } = require("mongoose");
const Order = require("../models/orderModel");
const puppeteer = require('puppeteer');
const short = require('short-uuid');
const { fetchCartList } = require("../controllers/cartController");

const createOrder = async(req, res) => {
    try {
        let shippingFree = 5; // static value made for this exercise only
        let orderData = req.body;
        let { sessionId } = req.params;
        console.log(sessionId);
        if (sessionId == null && sessionId == undefined) {
            throw Error("Session Id is missing");
        }

        let fetchCartResponse = await fetchCartList(sessionId);
        if (fetchCartResponse.message == "ERROR_FETCH_CART") {
            throw Error("Error fetching Cart list");
          }
        
        let totalAmount = fetchCartResponse.subtotal + shippingFree;
        if (totalAmount > orderData.dummyMoney){
            throw Error('insufficient funds');
        }
        console.log(fetchCartResponse.purchaseList);

        const order = new Order({
            orderReceiptNumber  : short.generate(),
            customerEmail       : orderData.customerEmail,
            customerFullName    : orderData.customerFullName,
            customerAddress     : orderData.customerAddress,
            customerContact     : orderData.customerContact,
            purchaseDetails: fetchCartResponse.purchaseList.map(details => {
                return {
                    productId       : details.productId,
                    productPrice    : details.productPrice,
                    size            : details.size,
                    orderQuantity   : details.orderQuantity,
                }
            }),
            totalPaymentAmount  : totalAmount,
            isPaymentDone       : 1,     
        });

        await order.save();
        res.status(201).json({
            data: {paymentId: order._id},
            message: "Order created successfully",
            status: 0,
        });
    } catch (error) {
        res.status(500).json({
            data: {},
            error: error.message,
            status: 1
        });
    }
}

const generateOrderInvoice = async(req, res) => {
    try {
        let { orderId } = req.params;
        const orderdata = await Order.findById(orderId);
        console.log('here');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        console.log(req.headers.host + req.originalUrl);
        // await page.goto('http://localhost:5173/confirmOrder/665203351ef5501f11b3032d');
        // GENERATE HTML CONTENT
        console.log('herer');
        const htmlContent = 
        `
        <html>
        <body>
        <h1>test title</h1>
        <p>test content</p>
        </body>
        </html>
        `
        console.log('after html');
        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
        console.log('after set page content');
        const pdfBuffer = await page.pdf();
        console.log('after pdf buffer');
        await browser.close()
        res.contentType('application/pdf');
        // res.status(201).json({
        //     data: pdfBuffer,
        //     message: "Successfully generate document",
        //     status: 0,
        // });
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating document:', error);
        res.status(500).json({
            data: {},
            error: 'Error generating document',
            status: 1
        });
    }
}

module.exports = { createOrder, generateOrderInvoice }
