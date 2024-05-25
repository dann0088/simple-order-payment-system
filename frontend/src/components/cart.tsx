import { useState } from "react";
import { Table, Image, Col, Row, Button } from "react-bootstrap";
import NavBar from "./navBar";
import { Link, useLoaderData } from "react-router-dom";

export default function Cart() {
	// let localCartList : any = JSON.parse(localStorage.getItem("cartList") || "[]");
	const sessionId = localStorage.getItem("sessionId");
	const result: any = useLoaderData();
	let resultCartList : any = result.data.purchaseList;
	console.log(resultCartList);
	const [cartList, setCartList] = useState((resultCartList.length > 0) ? resultCartList : []);
  	const [subtotal, setSubtotal] = useState<number>(result.data.subtotal);

	// useEffect(() => {
	// 	let ignore = false;
	// 	async function startFetching() {
	// 	//   const returnData : any = await fetchUserCart();
	// 	  if (!ignore) {
	// 	  }
	// 	}

	// 	console.log("SESSION ID: ", sessionId)
	// 	startFetching();
	// 	return() => {
	// 	  ignore = true
	// 	};
	// }, []);

	// const fetchUserCart = async () => {
	// 	try {
	// 		if (sessionId == null || sessionId == undefined) {
	// 			throw new Error("Undefined session id");
	// 		}
	// 		let response : any= await fetch(import.meta.env.VITE_API_URL + "cart/get/" + sessionId, {
	// 			method: "GET",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		});
	// 		if (!response.ok) {
	// 			return await response.json().then((response : any) => {throw new Error(response.error)})
	// 		}
	// 		return await response.json();
	// 	} catch (error: any) {
	// 		return error
	// 	}
	// }

	const deleteUserCart = async () => {
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
				return await response.json().then((response : any) => {throw new Error(response.error)})
			}
			await response.json();
			// localStorage.setItem("cartList", JSON.stringify([]));
			setCartList([]);
		} catch (error: any) {
			return error
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
    		<NavBar />
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
		</>
	)
}