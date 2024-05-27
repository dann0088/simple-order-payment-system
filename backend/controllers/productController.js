const Product = require("../models/productModel")

const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(201).json({
            data: products,
            message: "Successfully get all product!",
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

const getProductDetails = async(req, res) => {
    try {
        let {id} = req.params;
        const product = await Product.findById(id);
        res.status(201).json({
            data: product,
            message: "Successfully get product details",
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

// const updateProductQuantity = async(purchaseList)  => {
//     try {
//         purchaseList.forEach( async(item) => {
//             await Product.findOneAndUpdate(
//                 {_id: item._id},
//                 {"purchaseDetails": {
//                     $elemMatch: {"size": item.size}
//                     }   
//                 },
//                 {$inc: {"purchaseDetails.$.quantity" : -item.orderQuantity}},
//                 (err, updatedData) => {
//                     if (err) {
//                         throw new Error(err)
//                     }
//                 }
                
//             ) 
//         });
//     } catch (error) {
//         console.log(error);
//         return {
//             message: 'ERROR_FETCH_CART'
//         }
//     }
// }

const updateProductQuantity = async(purchaseList)  => {
    for (const item of purchaseList) {
        try {
          await Product.findOneAndUpdate(
            { _id: item._id, "purchaseDetails.size": item.size },
            { $inc: { "purchaseDetails.$.quantity": -item.orderQuantity } }
          );
        } catch (err) {
          console.error(err);
          throw new Error(err);
        }
    }
}

// async function updatePurchaseList(purchaseList) {
//     for (const item of purchaseList) {
//       try {
//         await Product.findOneAndUpdate(
//           { _id: item._id, "purchaseDetails.size": item.size },
//           { $inc: { "purchaseDetails.$.quantity": -item.orderQuantity } }
//         );
//       } catch (err) {
//         console.error(err);
//         throw new Error(err);
//       }
//     }
//   }
  
//   // Call the function to update the purchase list
//   updatePurchaseList(purchaseList).then(() => {
//     console.log('All items updated successfully.');
//   }).catch((err) => {
//     console.error('Error updating items:', err);
//   });

module.exports = { getProducts, getProductDetails, updateProductQuantity }