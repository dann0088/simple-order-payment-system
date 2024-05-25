import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavBar from "./navBar";

export default function Products() {
  const result: any = useLoaderData();
  const [products, setProducts] = useState(result.data);
  console.log(products);

  return (
    <div>
      <NavBar/>
      <Container>
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
      </Container>
      
    </div>
  )
}