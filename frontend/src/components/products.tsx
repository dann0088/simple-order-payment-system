import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavBar from "./navBar";

export default function Products() {
  let localCartCount : any = localStorage.getItem("cartCount");
  let result: any = useLoaderData();
  console.log(result)
  let productData : any[] = [];
  if (result.data != undefined && result.data != null) {
    productData = result.data;
  }
  const [error, setError] = useState<string | any>(result)
  const [products, setProducts] = useState(productData);
  console.log(products);

  return (
    <div>
      <NavBar quantity={(localCartCount !== undefined) ? localCartCount : 0}/>
      <Container>
      {
        (products.length > 0) ?
        <Row xs={2} md={4} className="g-4">
        {products.map(
          (product: any, i: number) => {
            return (
              <Col key={i} style={{padding: 30}}>
                <Card>
                  <Card.Img variant="top" src={product.imageUrl} width={150}/>
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <br/>                    
                    <Link to={"/product/" + product._id}><Button variant="primary">Go somewhere</Button></Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          }
        )}
      </Row>
      :
      <div>
        <h1 style={{color: "white"}}>{error.message}</h1>
      </div>

      }
      
      </Container>
      
    </div>
  )
}