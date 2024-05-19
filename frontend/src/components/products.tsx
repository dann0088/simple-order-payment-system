import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavBar from "./navBar";
import "./products.css"

export default function Products() {
  const result: any = useLoaderData();
  const [products, setProducts] = useState(result.data);
  console.log(products);


  return (
    <div>
      <NavBar/>
      <Container className="py-4">
      <Row xs={1} md={2} className="g-4">
        {products.map(
          (product: any, i: number) => {
            return (
              <Col key={i}>
                <Card>
                  <Row className="mb-3">
                    <Col md='auto'>test</Col>
                    <Col md='auto'>test</Col>
                    <Col md='auto'>test</Col>
                  </Row>
                  <Card.Img variant="top" src={product.imageUrl} width={250}/>
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
      </Container>
      
    </div>
  )
}