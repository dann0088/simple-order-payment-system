import { useState } from "react"
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import NavBar from "./navBar";


export default function Checkout() {
  let localCartList : any = JSON.parse(localStorage.getItem("cartList") || "[]");
	const [validated, setValidated] = useState<boolean>(false);
  // To Do - set shipping fee base on user Address (current set on dummy data)
  const [shippingFee, setShippingFee] = useState<number>(5);  
  const [show, setShow] = useState(false);

  const computeSubTotal = () => {
    let subtotal : number = 0;
    for (let i = 0; i < localCartList.length; i++) {
      subtotal = subtotal + parseInt(localCartList[i].productPrice);
    }
    return subtotal
  }

	const handleSubmit = (event: any) => {
		const form = event.currentTarget;
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      handleShow(); 
    }
	}

  const handleDummyCardMoney = (event: any) => {
    const dummyMoney = event.target.value;
    console.log(dummyMoney);
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
          <Modal.Title>Dummy money inside the card (for response)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add dummy money inside your card to test the response from the server
          <Form.Control type="number" placeholder="Dummy card money" name="dummyCardMoney" onChange={handleDummyCardMoney} required/>
            <Form.Control.Feedback type="invalid">
              Please add dummy money to test API response
            </Form.Control.Feedback>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>		
  )
}