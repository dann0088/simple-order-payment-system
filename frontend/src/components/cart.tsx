import { useEffect, useState } from "react";
import { Table, Image, Col, Row, Button } from "react-bootstrap";
import NavBar from "./navBar";
import { Link } from "react-router-dom";

export default function Cart() {
	let localCartList : any = JSON.parse(localStorage.getItem("cartList") || "[]");
	const [cartList, setCartList] = useState([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
		// setCartList(localCartList);
		console.log(localCartList)
	}, localCartList)

	const populateCartList = () => {
		let list : any = []
		for (let i = 0; i < localCartList.length; i++) { 
				list.push(
					<tr>
						<td><Image src={localCartList[i].productImage} thumbnail style={{width: 150}}></Image></td>
						<td>
							<Row>
								<Col md='auto'>Name:</Col>
								<Col md='auto'>{localCartList[i].productName}</Col>
							</Row>
							<Row>
								<Col md='auto'>Price:</Col>
								<Col md='auto'>${localCartList[i].productPrice}</Col>
							</Row>
							<Row>
								<Col md='auto'>Size:</Col>
								<Col md='auto'>{localCartList[i].productSize}</Col>
							</Row>
							<Row>
								<Col md='auto'>Quantity:</Col>
								<Col md='auto'>{localCartList[i].productQuantity}</Col>
							</Row>
					</td>
				</tr>
			)
		}
    return list;
	}

  const computeSubTotal = () => {
    let subtotal : number = 0;
    for (let i = 0; i < localCartList.length; i++) {
      subtotal = subtotal + parseInt(localCartList[i].productPrice);
    }
    return subtotal
  }

	return(
		<>
    <NavBar />
		<div className="py-4 center-table" style={{width: 500}}>
      <Table striped bordered hover variant="dark" size="sm">
        <tbody>
          {populateCartList()}
        </tbody>
      </Table>
      <Row style={{color: "white"}}>
        <Col><h5>Subtotal:</h5> </Col>
        <Col><h5>${computeSubTotal()}</h5></Col>
      </Row>
      <Row style={{color: "white"}}>
        <Link to={"/checkout"}><Button variant="primary"><b>CHECKOUT</b></Button></Link>
      </Row>
		</div>
		</>
	)
}