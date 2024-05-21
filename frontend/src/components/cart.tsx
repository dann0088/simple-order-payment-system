import { useEffect, useState } from "react";
import { Table, Image, Col, Row } from "react-bootstrap";

export default function Cart() {
	let localCartList : any = JSON.parse(localStorage.getItem("cartList") || "[]");
	const [cartList, setCartList] = useState([]);

	const populateCartList = () => {
		for (let i = 0; i < localCartList.length; i++) {
			return (
				<Table striped bordered hover variant="dark" size="sm">
					<tbody>
						<tr>
							{/* <td><Image src={localCartList[i].productImage} thumbnail /></td> */}
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
					</tbody>
				</Table>
			)
				
		}
	}

	useEffect(() => {
		// setCartList(localCartList);
		console.log(localCartList)
	}, localCartList)
	return(
		<>
		<div className="py-4 center-nav" style={{width: 500}}>
			{populateCartList()}
		</div>
		</>
	)
}