const Cart = require("../models/cartModel");

const addCart = async(req, res) => {
  try {
    let purchaseDetails = req.body.purchaseDetails;
    if (purchaseDetails == undefined && purchaseDetails == null) {
      throw new Error('no product(s) found');
    }
    console.log(req.body.purchaseDetails);
    let { sessionId } = req.params;
    if (sessionId == null || sessionId == undefined) {
      throw new Error('Guest id is missing');
    }
    
    const addCartResponse = await Cart.findOneAndUpdate(
      {'guestId': sessionId},
      {$push: {purchaseDetails : purchaseDetails}},
      {
        upsert: true
      }
    )
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

const countCartList = async(req, res) => {
  try {
    let { sessionId } = req.params;
    const fetchCartResponse = await Cart.aggregate(
      [
        {
          $match: {
            guestId: sessionId
          }
        },
        {
          $project: {
            countCart : {
              $size: '$purchaseDetails'
            }
          }
        }
      ]
    )
    let cartCount = 0;
    if (fetchCartResponse.length !== 0) {
      cartCount = fetchCartResponse[0].countCart
    }
    res.status(201).json({
      count: cartCount,
      message: "Count user cart list",
      status: 0,
    });
  } catch (error) {
    
  }
}

const getCartList = async(req, res) => {
  try {
    let { sessionId } = req.params;
    const fetchCartResponse = await fetchCartList(sessionId);
    if (fetchCartResponse.message == "ERROR_FETCH_CART") {
      throw Error("Error fetching Cart list");
    }
    
    res.status(201).json({
        data: fetchCartResponse,
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
    if (sessionId == null || sessionId == undefined) {
      throw new Error('Guest id is missing');
    }
    console.log(sessionId)
    const product = await Cart.findOneAndDelete({guestId : sessionId});
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

const fetchCartList = async(sessionId) => {
  try {
    let cartDetails = {
      subtotal : 0,
      purchaseList : []
    }; 
    
    const product = await Cart.find({guestId: sessionId});
    
    if (product.length > 0) {
      let totalPrice = 0;
      let purchaseDetails = product[0].purchaseDetails;
      for (let i = 0; i < purchaseDetails.length; i++) {
        totalPrice += purchaseDetails[i].productPrice;
      }

      cartDetails.subtotal = totalPrice;
      cartDetails.purchaseList = purchaseDetails;
    }
    return cartDetails;
  } catch (error) {
    return {
      message: 'ERROR_FETCH_CART'
    }
  }
}

module.exports = { addCart, getCartList, deleteAllCart, fetchCartList, countCartList}
