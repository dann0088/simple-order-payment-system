import { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button, Image } from "react-bootstrap";
import { useLoaderData, useParams } from "react-router-dom"
import NavBar from "./navBar";
import ErrorModal from "./modals/errorModal";

export interface CartProductDetails {
  productId     : string,
  productName   : string,
  productPrice  : number,
  size          : number,
  orderQuantity : number,
  productImage  : string
}

export default function ProductDetails() {
  let localCartCount : any = localStorage.getItem("cartCount");
  const sessionId = localStorage.getItem("sessionId");
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<any>([]);
  const [price, setPrice] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [productVariant, setProductVariant] = useState<any>([]);
  const [cartCount, setCartCount] = useState<number | any>((localCartCount !== undefined) ? parseInt(localCartCount) : 0);
  const [showErrorModal, updateErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  // const [cartList, setCartList] = useState<any>(localCartList);

  useEffect(() => {
    let ignore = false;
    async function startFetching() {
      const json = await fetchProductDetails();
      if (!ignore) {
        console.log(json);
        if (json !== undefined || json !== null) {
          setProductDetails(json.data)
          setProductVariant(json.data.productVariant)
          setPrice(json.data.productVariant[0].price)
        }
        
      }
    }
    console.log("SESSION ID: ", sessionId)
    startFetching();
    return() => {
      ignore = true
    };
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      if (productId == null || productId == undefined) {
        throw new Error("Undefined product id");
      }
      const response = await fetch(import.meta.env.VITE_API_URL + "product/get/" + productId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw await response.json();
      }
      return await response.json();
        
    } catch (error: any) {
      console.log(error)
      setErrorMessage(error.message);
      toggleModal();
    }
  }

  const addToCart = async () => {
    let cartData : CartProductDetails = {
      productId     : productDetails._id,
      productImage  : productDetails.imageUrl,
      productName   : productDetails.productName,
      productPrice  : price,
      orderQuantity: 1,
      size   : size
    }
    console.log(cartData);
    // localCartList.push(cartData);
    // localStorage.setItem("cartList", JSON.stringify(localCartList));
    try {
      const response : any = await fetch(import.meta.env.VITE_API_URL + "cart/add/" + sessionId, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purchaseDetails : cartData
        })
      });
      if (!response.ok) {
        throw await response.json();
      }

      let addCartCount : number = cartCount + 1;
      setCartCount(addCartCount);
      localStorage.setItem("cartCount", addCartCount.toString())
      return await response.json();
    } catch (error : any) {
      console.log(error)
      setErrorMessage(error.message);
      toggleModal();
    }
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

  const toggleModal = () => updateErrorModal(state => !state);
  
  return (
    <div>
      <NavBar quantity={cartCount}/>
      {
        (productDetails.length !== 0) ?
        <Row xs={1} md={2} className="g-4 center-nav">
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
            </Card>
          </Col>
        </Row>
        :
        <div>
          <h1 style={{color: "white"}}>Service Unavailable, Please try again later.</h1>
        </div>
      }
      

      <ErrorModal canShow={showErrorModal} updateModalState={toggleModal} message={errorMessage} />
    </div>
  );
}