const { default: mongoose } = require("mongoose");
const Order = require("../models/orderModel");
const puppeteer = require('puppeteer');
const short = require('short-uuid');
const { fetchCartList } = require("../controllers/cartController");
const { pdfHTMLFormat } = require("../pdf/pdfFormat");

const createOrder = async(req, res) => {
    try {
        const shippingFee = 5; // static value made for this exercise only
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
        
        let totalAmount = fetchCartResponse.subtotal + shippingFee;
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
                    productName     : details.productName,
                    productPrice    : details.productPrice,
                    size            : details.size,
                    orderQuantity   : details.orderQuantity,
                }
            }),
            totalPaymentAmount  : totalAmount,
            shippingFee         : shippingFee,
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
        const orderData = await Order.findById(orderId);
        const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
       
        // GENERATE HTML CONTENT
        const htmlContent = await pdfHTMLFormat(orderData);
        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
        const pdfBuffer = await page.pdf({format: 'A4', printBackground: true});
        await browser.close()
        res.contentType('application/pdf');
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
