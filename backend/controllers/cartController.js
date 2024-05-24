const Cart = require("../models/cartModel");

const addCart = async(req, res) => {
  try {
    let purchaseDetails = req.body.purchaseDetails;
    if (purchaseDetails.length <= 0) {
        throw new Error('no product(s) found');
    }

    const cart = new Cart({
        guestId               : req.body.sessionId,
        purchaseDetails: purchaseDetails.map(details => {
            return {
                productImage    : details.productImage,
                productId       : details.productId,
                productPrice    : details.productPrice,
                size            : details.size,
                orderQuantity   : details.orderQuantity,
            }
        }),
    });

    await cart.save();
    res.status(201).json({
      data: cart,
      message: "Cart Successfully Checkout",
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
        let sessionId = req.body.sessionId;
        const product = await Cart.findById(sessionId);
        res.status(201).json({
            data: product,
            message: "Successfully get cart list",
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

module.exports = { addCart, getCartList }
