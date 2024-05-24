import { CartProductDetails } from "./productDetails.interface"

export interface PaymentData {
    customerEmail       : string,
    customerFullName    : string,
    customerAddress     : string,
    customerContact     : number,
    paymentFee          : number,
    totalPaymentAmount  : number,
    dummyMoney          : number,
    purchaseDetails     : CartProductDetails[]
  }