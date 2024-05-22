import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"

type Props = {
    subTotal: number
}

export default function Checkout({subTotal} : Props) {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event: any) => {
		const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
	}
    
    return(
			<div className="py-4 center-table" style={{width: 700, color: "white", textAlign: "left"}}>
				<Row>
					<Col>
						<h5>Contact</h5>
						<Form noValidate validated={validated} onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="formContact">
								<Form.Control type="text" placeholder="Enter email" required />
								<Form.Control.Feedback type="invalid">
									Please provide an email.
								</Form.Control.Feedback>
							</Form.Group>

							<h5>Delivery</h5>
							<Form.Group className="mb-3" controlId="formFirstName">
								<Form.Control type="text" placeholder="First name" required/>
								<Form.Control.Feedback type="invalid">
									Please provide your first name.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formLastName">
								<Form.Control type="text" placeholder="Last name" required/>
								<Form.Control.Feedback type="invalid">
									Please provide your last name.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formAddress">
								<Form.Control type="text" placeholder="Address" required/>
								<Form.Control.Feedback type="invalid">
									Please provide an address.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formContact">
								<Form.Control type="text" placeholder="Phone" required/>
								<Form.Control.Feedback type="invalid">
									Please provide your contact.
								</Form.Control.Feedback>
							</Form.Group>

							<h5>Payment</h5>
							<Form.Group className="mb-3" controlId="formCardNumber">
								<Form.Control type="text" placeholder="Card number" required/>
								<Form.Control.Feedback type="invalid">
									Card Number is required.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formSecurityCode">
								<Form.Control type="text" placeholder="Security code" required/>
								<Form.Control.Feedback type="invalid">
									Card Security Code is required.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formCardName">
								<Form.Control type="text" placeholder="Name on card" required/>
								<Form.Control.Feedback type="invalid">
									Name on card is required.
								</Form.Control.Feedback>
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
				</Col>

				<Col>
					<h1>Total: 1 million</h1>
				</Col>
				</Row>
				
			</div>
			
    )
}