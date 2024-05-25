import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../App.css'

function ConfirmOrder() {
    const { orderId } = useParams();

    const generateInvoice = async () => {
        try {
          if (orderId == null || orderId == undefined) {
            throw new Error("Undefined order id");
          }
          const response = await fetch(import.meta.env.VITE_API_URL + "order/invoice/" + orderId, {
            method: "POST",
            headers: {
                "Accept": "application/pdf",
                "Content-Type": "application/pdf",
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          await response.json(); 
        } catch (error) {
          console.error('Error:', error);
        }
      }

    console.log(orderId);
    return (
        <div style={{marginTop: 50}}>
            <h2 style={{color : "white"}}>Confirm Order</h2>
            <h4 style={{color : "white"}}>Please print you receipt before closing this page.</h4>
            <Button onClick={generateInvoice}>Print your receipt</Button>
        </div>
        );
    }
  
  export default ConfirmOrder;