const Cart = require("../models/cartModel");

const addCart = async(req, res) => {
  try {
    let purchaseDetails = req.body.purchaseDetails;
    if (purchaseDetails.length <= 0) {
      throw new Error('no product(s) found');
    }
    console.log(req.params);
    let { sessionId } = req.params;
    if (sessionId == null || sessionId == undefined) {
      throw new Error('Guest id is missing');
    }
    
    let cartData = new Cart({
        guestId               : sessionId,
        purchaseDetails       : purchaseDetails.map(details => {
            return {
                productId       : details.productId,
                productName     : details.productName,
                productImage    : details.productImage,
                productPrice    : details.productPrice,
                size            : details.size,
                orderQuantity   : details.orderQuantity,
            }
        }),
    });
    
    const addCartResponse = await Cart.findOneAndUpdate(
      {'guestId': cartData.guestId},
      {$push: {purchaseDetails : cartData.purchaseDetails}},
      {
        upsert: true
      }
    )
    console.log(cartData.purchaseDetails)
    res.status(201).json({
      data: addCartResponse,
      message: "Product added to cart sucessfully",
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

const getCartList = async(req, res) => {
    try {
      let { sessionId } = req.params;
        const product = await Cart.find({guestId: sessionId});
        res.status(201).json({
            data: product,
            message: "Successfully get cart list",
            status: 0,
        });
    } catch (error) {
        res.status(500).json({
            data: [],
            error: error.message,
            status: 1
        });
    }
}

const deleteAllCart = async(req, res) => {
  try {
    let { sessionId } = req.params;
      const product = await Cart.findOneAndDelete(sessionId);
      res.status(201).json({
          data: product,
          message: "Successfully delete all user cart list",
          status: 0,
      });
  } catch (error) {
      res.status(500).json({
          data: [],
          error: error.message,
          status: 1
      });
  }
}

module.exports = { addCart, getCartList, deleteAllCart }
