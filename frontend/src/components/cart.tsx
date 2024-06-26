import { useState } from "react";
import { Table, Image, Col, Row, Button } from "react-bootstrap";
import NavBar from "./navBar";
import { Link, useLoaderData } from "react-router-dom";
import ErrorModal from "./modals/errorModal";

export default function Cart() {
	// let localCartList : any = JSON.parse(localStorage.getItem("cartList") || "[]");
	const sessionId = localStorage.getItem("sessionId");
	let localCartCount : any = localStorage.getItem("cartCount");

	const result: any = useLoaderData();
	let resultCartList : any[] = [];
	let resultSubTotal : number = 0;
	if (result.data != undefined && result.data != null) {
		resultCartList = result.data.purchaseList;
		resultSubTotal = result.data.subtotal;
	}
	// let resultCartList : any = result.data.purchaseList;
	console.log(resultCartList);
	const [cartList, setCartList] = useState((resultCartList.length > 0) ? resultCartList : []);
  	const [subtotal, setSubtotal] = useState<number>(resultSubTotal);
	const [showErrorModal, updateErrorModal] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const deleteUserCart = async () => {
		console.log(sessionId);
		try {
			if (sessionId == null || sessionId == undefined) {
				throw new Error("Undefined session id");
			}
			const response = await fetch(import.meta.env.VITE_API_URL + "cart/delete/" + sessionId, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw await response.json();
			}
			await response.json();
			localStorage.setItem("cartCount", '0');
			setCartList([]);
		} catch (error: any) {
			console.log(error)
			setErrorMessage(error.message);
			toggleModal();
		}
	}

	const setSizeString = (p_sizeValue: number) => {
		let sizeText : string = "";
		switch (p_sizeValue) {
		  case 0:
			sizeText = 'small';
			break;
		  case 1:
			sizeText = 'medium';
			break;
		  case 2:
			sizeText = 'large';
			break;
		  case 3:
			sizeText = 'X large';
			break;
		  default:
			break;
		}
		return sizeText;
	  }

	const populateCartList = () => {
		console.log(cartList);
		let list : any = []
		for (let i = 0; i < cartList.length; i++) { 
				list.push(
					<tr>
						<td><Image src={cartList[i].productImage} thumbnail style={{width: 150}}></Image></td>
						<td>
							<Row>
								<Col xs={4}>Name:</Col>
								<Col md='auto'>{cartList[i].productName}</Col>
							</Row>
							<Row>
								<Col xs={4}>Price:</Col>
								<Col md='auto'>${cartList[i].productPrice}</Col>
							</Row>
							<Row>
								<Col xs={4}>Size:</Col>
								<Col md='auto'>{setSizeString(cartList[i].size)}</Col>
							</Row>
							<Row>
								<Col xs={4}>Quantity:</Col>
								<Col md='auto'>{cartList[i].orderQuantity}</Col>
							</Row>
					</td>
				</tr>
			)
		}
    	return list;
	}

	const toggleModal = () => updateErrorModal(state => !state);

	// const computeSubTotal = () => {
	// 	let subtotal : number = 0;
	// 	for (let i = 0; i < cartList.length; i++) {
	// 	subtotal = subtotal + parseInt(cartList[i].productPrice);
	// 	}
	// 	return subtotal
	// }

	// const clearCartData = () => {
	// 	localStorage.setItem("cartList", JSON.stringify([]));
	// 	setCartList([]);
	// }

	return(
		<>
    		<NavBar quantity={(localCartCount !== undefined) ? localCartCount : 0}/>
			{
				(cartList.length > 0) 
				?
				<div>
					<Button variant="danger" onClick={deleteUserCart}>Clear Cart</Button>
					<div className="py-4 center-table" style={{width: 500}}>
						<Table striped bordered hover variant="dark" size="sm">
							<tbody>
								{populateCartList()}
							</tbody>
						</Table>
						<Row style={{color: "white"}}>
							<Col><h5>Subtotal:</h5> </Col>
							<Col><h5>${subtotal}</h5></Col>
						</Row>
						<Row style={{color: "white"}}>
							<Link to={"/checkout"}><Button variant="primary"><b>CHECKOUT</b></Button></Link>
						</Row>
					</div>
				</div>
			:
			<div className="py-4 center-table" style={{color: "white"}}><h3>YOUR CART IS EMPTY</h3></div>
			}
			<ErrorModal canShow={showErrorModal} updateModalState={toggleModal} message={errorMessage} />
		</>
	)
}