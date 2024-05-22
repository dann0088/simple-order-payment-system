import { useEffect, useState } from "react";
import { Card, Col, FormSelect, ListGroup, Row, Form, Button, Image } from "react-bootstrap";
import { useLoaderData, useParams } from "react-router-dom"
import NavBar from "./navBar";

export default function ProductDetails() {
  const localCartList = JSON.parse(localStorage.getItem("cartList") || "[]");

  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<any>([]);
  const [price, setPrice] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [productVariant, setProductVariant] = useState<any>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  // const [cartList, setCartList] = useState<any>(localCartList);

  useEffect(() => {
    let ignore = false;
    async function startFetching() {
      const json = await fetchProductDetails(id);
      if (!ignore) {
        console.log(json);
        setProductDetails(json.data)
        setProductVariant(json.data.productVariant)
        setPricePerSize(0)
      }
    }

    startFetching();
    return() => {
      ignore = true
    };
  }, [id]);

  const fetchProductDetails = async (p_id: string | any) => {
    try {
      if (p_id == null || p_id == undefined) {
        throw new Error("Undefined product id");
      }
      const response = await fetch(import.meta.env.VITE_API_URL + "product/get/" + p_id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
        
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const addToCart = () => {
    let cartData : any = {
      productId     : productDetails._id,
      productImage  : productDetails.imageUrl,
      productName   : productDetails.productName,
      productPrice  : price,
      productQuantity: 1,
      productSize   : setSizeString(size)
    }
    localCartList.push(cartData);
    localStorage.setItem("cartList", JSON.stringify(localCartList));
    // localStorage.setItem("cartList", JSON.stringify([]));
    setCartCount((cartCount) => cartCount + 1);
  }

  const setPricePerSize = (p_selectedSize: number) => {
    for (let i = 0; i < productVariant.length; i++) {
      if (productVariant[i].size === p_selectedSize) {
        setPrice(productVariant[i].price)
      }
    }
  }

  const selectSize = () => {
    let variant : any =  [];
    for (let i = 0; i < productVariant.length; i++) {
      variant.push(
        <option key={productVariant[i].size} value={productVariant[i].size}>{setSizeString(productVariant[i].size)}</option>
      )
    }
    return variant;
  }

  const onSetSize = (event: any) => {
    var selectedSize = parseInt(event.target.value);
    console.log(selectedSize);
    setSize(selectedSize);
    setPricePerSize(selectedSize);
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
  
  return (
    <div>
      <NavBar quantity={cartCount}/>
      <Row xs={1} md={2} className="g-4 center-nav">
        
        {/* <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={productDetails.imageUrl} width={300}/>
        </Card> */}
        <Col>
          <Image src={productDetails.imageUrl} thumbnail />
        </Col>
        <Col>
        <Card style={{ textAlign: 'left'}}>
          <Card.Body>
            <Card.Title>{productDetails.productName}</Card.Title>
            <Card.Text>
              {productDetails.productDescription}
            </Card.Text>

            <Card.Text>
              <Row>
                <Col md="auto">Price:</Col>
                <Col>{price}$</Col>
              </Row>
            </Card.Text>

            <Card.Text>
              <Row>
                <Col md="auto">Size:</Col>
                <Col>
                  <Form.Select style={{ width: '10em'}} aria-label="Default select example" value={size} onChange={onSetSize}>
                  {selectSize()}
                  </Form.Select>
                </Col>
              </Row>
            </Card.Text>

            <Button variant="primary" onClick={addToCart}>Add to Cart</Button>{' '}
          </Card.Body>
        </Card></Col>
        
      </Row>
    </div>
  );
}