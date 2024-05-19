import { useEffect, useState } from "react";
import { Card, ListGroup, Row } from "react-bootstrap";
import { useLoaderData, useParams } from "react-router-dom"

export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<any>([]);

  useEffect(() => {
    let ignore = false;
    async function startFetching() {
      const json = await fetchProductDetails(id);
      if (!ignore) {
        console.log(json);
        setProductDetails(json.data)
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
  
  return (
    <Row xs={1} md={2} className="g-4">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={productDetails.imageUrl} width={300}/>
        <Card.Body>
          <Card.Title>{productDetails.productName}</Card.Title>
          <Card.Text>
          {productDetails.productDetails}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </Row>
    
  );
}