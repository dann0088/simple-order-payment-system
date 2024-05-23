// const Payment = require("../models/paymentModel");
// const short = require('short-uuid');

// const createPayment = async(req, res) => {
//   try {
//     const payment = new Payment({
//       orderReceiptNumber       : short.generate(),
//       customerEmail       : req.body.customerEmail,
//       customerContact     : req.body.customerContact,
//       method              : req.body.method,
//       paymentOrders       : req.body.orderId,
//       isPaymentDone       : true, // just for this exercise
//       paymentFee         : req.body.paymentFee, // To Do payment fee will be the method value
//       totalPaymentAmount         : req.body.totalPaymentAmount,   
//     });

//     await payment.save();
//     res.status(201).json({
//       data: order,
//       message: "Payment created successfully",
//       status: 0,
//     });
//   } catch (error) {
//     res.status(500).json({
//       data: {},
//       error: error.message,
//       status: 1
//     });
//   }
// }

// module.exports = { createPayment }
