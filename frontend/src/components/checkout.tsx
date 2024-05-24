import { useState } from "react"
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import NavBar from "./navBar";
import { CartProductDetails } from "../interfaces/productDetails.interface";
import { PaymentData } from "../interfaces/paymentData.interface";
// export interface CartProductDetails {
//   productId     : string,
//   productPrice  : number,
//   size          : number,
//   orderQuantity : number,
// }

// export interface ConfirmItemData {
//   customerEmail       : string,
//   customerFullName    : string,
//   customerAddress     : string,
//   customerContact     : number,
//   paymentFee          : number,
//   totalPaymentAmount  : number,
//   dummyMoney          : number,
//   purchaseDetails     : CartProductDetails[]
// }

export default function Checkout() {
  let localCartList : any = JSON.parse(localStorage.getItem("cartList") || "[]");
	const [validated, setValidated] = useState<boolean>(false);
  // To Do - set shipping fee base on user Address (current set on dummy data)
  const [shippingFee, setShippingFee] = useState<number>(5);  
  const [show, setShow] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const computeSubTotal = () => {
    let subtotal : number = 0;
    for (let i = 0; i < localCartList.length; i++) {
      subtotal = subtotal + parseInt(localCartList[i].productPrice);
    }
    return subtotal
  }

	const handleConfirmOrder = async (event: any) => {
    event.preventDefault();
    let form = event.currentTarget;
    let orderDetailsForm = new FormData(form);
    let orderDetailsData = Object.fromEntries(orderDetailsForm.entries());

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      const response = await sendOrder(orderDetailsData);
      console.log(response);
      // handleShow();
    }
	}

  const sendOrder = async (p_orderDetailsData: any) => {
    let productDetailsList : CartProductDetails[] = [];

    for (let i = 0; i < localCartList.length; i++) {
      let productDetails : CartProductDetails = {
        productId     : localCartList[i].productId,
        productPrice  : localCartList[i].productPrice,
        size          : localCartList[i].productSize,
        orderQuantity : localCartList[i].productQuantity
      }
      productDetailsList.push(productDetails);
    }

    let confirmItemData : PaymentData = {
      customerEmail       : p_orderDetailsData.email as string,
      customerFullName    : p_orderDetailsData.firstName + " " + p_orderDetailsData.lastName,
      customerAddress     : p_orderDetailsData.address as string,
      customerContact     : parseInt(p_orderDetailsData.phone as string),
      paymentFee          : shippingFee,
      totalPaymentAmount  : computeSubTotal(),
      purchaseDetails     : productDetailsList,
      dummyMoney          : p_orderDetailsData.dummyMoney
    }
    try {
      const response : any = await fetch(import.meta.env.VITE_API_URL + "order/create", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(confirmItemData)
      });
      if (!response.ok) {
        return await response.json().then((response : any) => {throw new Error(response.error)})
      }
      return await response.json();
    } catch (error : any) {
      setErrorMessage(error.message);
      // return error.message;
      handleShow();
    }
  }

  const getTotalPrice = () => {
    return computeSubTotal() + shippingFee;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  return(
    <>
      <NavBar/>
      <div className="py-4 center-table" style={{width: 500, color: "white", textAlign: "left"}}>
        <h5>Contact</h5>
        <Form noValidate validated={validated} onSubmit={handleConfirmOrder}>
          <Form.Group className="mb-3" controlId="formContact">
            <Form.Control type="email" placeholder="Enter email" name="email" required />
            <Form.Control.Feedback type="invalid">
              Please provide an email.
            </Form.Control.Feedback>
          </Form.Group>

          <h5>Delivery</h5>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Control type="text" placeholder="First name" name="firstName" required/>
            <Form.Control.Feedback type="invalid">
              Please provide your first name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Control type="text" placeholder="Last name" name="lastName" required/>
            <Form.Control.Feedback type="invalid">
              Please provide your last name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Control type="text" placeholder="Address" name="address" required/>
            <Form.Control.Feedback type="invalid">
              Please provide an address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContact">
            <Form.Control type="number" placeholder="Phone" name="phone" required/>
            <Form.Control.Feedback type="invalid">
              Please provide your contact.
            </Form.Control.Feedback>
          </Form.Group>

          <h5>Payment</h5>
          <Form.Group className="mb-3" controlId="formCardNumber">
            <Form.Control type="text" placeholder="Card number" name="cardNumber" required/>
            <Form.Control.Feedback type="invalid">
              Card Number is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSecurityCode">
            <Form.Control type="number" placeholder="Security code" name="securityCode" required/>
            <Form.Control.Feedback type="invalid">
              Card Security Code is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCardName">
            <Form.Control type="text" placeholder="Name on card" name="cardName" required/>
            <Form.Control.Feedback type="invalid">
              Name on card is required.
            </Form.Control.Feedback>
          </Form.Group>

          <h5>Account Money</h5>
          <i><b>(Note: this is for testing the API only without the actual payment gateway)</b></i>
          <Form.Group className="mb-3" controlId="formDummyMoney">
            <Form.Control type="number" placeholder="Account Money" name="dummyMoney" required/>
            <Form.Control.Feedback type="invalid">
              Adding dummy account money is required.
            </Form.Control.Feedback>
          </Form.Group>
          <hr/>
          <Row>
            <Col>Sub Total:</Col>
            <Col>${computeSubTotal()}</Col>
          </Row>
          <Row>
            <Col>Shipping Fee:</Col>
            <Col>${shippingFee}</Col>
          </Row>
          <Row>
            <Col><h4>Total:</h4></Col>
            <Col><h4>${getTotalPrice()}</h4></Col>
          </Row>

          <Button variant="primary" type="submit" style={{marginTop: 10}}>
            Confirm Order
          </Button>
        </Form>
			</div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error encountered</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>		
  )
}