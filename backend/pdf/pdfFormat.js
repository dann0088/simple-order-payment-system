const setSizeString = (p_sizeValue) => {
    let sizeText = "";
    switch (p_sizeValue) {
      case 0:
        sizeText = 'Small';
        break;
      case 1:
        sizeText = 'Medium';
        break;
      case 2:
        sizeText = 'Large';
        break;
      case 3:
        sizeText = 'X large';
        break;
      default:
        break;
    }
    return sizeText;
}

const setDate = (p_date) => {
    const dateObj = new Date(p_date);
    const month   = dateObj.getUTCMonth() + 1; // months from 1-12
    const day     = dateObj.getUTCDate();
    const year    = dateObj.getUTCFullYear();
    const newDate = `${month}/${day}/${year}`;
    return newDate;
  }

const pdfHTMLFormat = async(orderData) => {
    let purchaseList = [];
    let purchaseDetail = orderData.purchaseDetails;
    for (let i = 0; i < purchaseDetail.length; i++) {
        purchaseList.push(
            `<tr class="item">
                <td>${purchaseDetail[i].productName}</td>
                <td>${setSizeString(purchaseDetail[i].size)}</td>
                <td>${purchaseDetail[i].orderQuantity}</td>
                <td>$${purchaseDetail[i].productPrice}</td>
            </tr>`
        )
    }
    console.log(purchaseDetail);
    const htmlContent =
        `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <style>
                    .invoice-box {
                        margin: auto;
                        padding: 30px;
                        border: 1px solid #eee;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                        font-size: 16px;
                        line-height: 24px;
                        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                        color: #555;
                    }

                    .invoice-box table {
                        width: 100%;
                        line-height: inherit;
                        text-align: left;
                    }

                    .invoice-box table td {
                        padding: 5px;
                        vertical-align: top;
                    }

                    .invoice-box table tr td:nth-child(2) {
                        text-align: right;
                    }

                    .invoice-box table tr.top table td {
                        padding-bottom: 20px;
                    }

                    .invoice-box table tr.top table td.title {
                        font-size: 45px;
                        line-height: 45px;
                        color: #333;
                    }

                    .invoice-box table tr.information table td {
                        padding-bottom: 40px;
                    }

                    .invoice-box table tr.heading td {
                        background: #eee;
                        border-bottom: 1px solid #ddd;
                        font-weight: bold;
                    }

                    .invoice-box table tr.details td {
                        padding-bottom: 20px;
                    }

                    .invoice-box table tr.item td {
                        border-bottom: 1px solid #eee;
                    }

                    .invoice-box table tr.item.last td {
                        border-bottom: none;
                    }

                    .invoice-box table tr.total td:nth-child(2) {
                        border-top: 2px solid #eee;
                        font-weight: bold;
                    }

                    @media only screen and (max-width: 600px) {
                        .invoice-box table tr.top table td {
                            width: 100%;
                            display: block;
                            text-align: center;
                        }

                        .invoice-box table tr.information table td {
                            width: 100%;
                            display: block;
                            text-align: center;
                        }
                    }

                    /** RTL **/
                    .invoice-box.rtl {
                        direction: rtl;
                        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                    }

                    .invoice-box.rtl table {
                        text-align: right;
                    }

                    .invoice-box.rtl table tr td:nth-child(2) {
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <div class="invoice-box">
                    <table cellpadding="0" cellspacing="0">
                        <tr class="top">
                            <td colspan="2">
                                <table>
                                    <tr>
                                        <td>
                                            <b>Invoice #:</b> ${orderData.orderReceiptNumber}<br />
                                            <b>Order Created:</b> ${setDate(orderData.createdAt)}<br />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr class="information">
                            <td colspan="2">
                                <table>
                                    <tr>
                                        <td>
                                            <b>Customer name:</b> ${orderData.customerFullName}<br />
                                            <b>Customer email:</b> ${orderData.customerEmail}<br />
                                            <b>Customer address:</b> ${orderData.customerAddress}<br />
                                            <b>Customer #:</b> ${orderData.customerContact}<br />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr class="heading">
                            <td>Payment Method</td>
                        </tr>

                        <tr class="details">
                            <td>Card</td>
                        </tr>

                        <tr class="heading">
                            <td>Item</td>
                            <td>Size</td>
                            <td>quantity</td>
                            <td>Price</td>
                        </tr>
                        
                        ${purchaseList}

                        <tr class="total">
                            <td></td>   
                            <td></td>
                            <td></td>
                            <td>
                                Shipping Fee: $${orderData.shippingFee} <br />
                                <h3>Total: $${orderData.totalPaymentAmount}</h3>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>
        `
    return htmlContent;
}

module.exports = { pdfHTMLFormat }
