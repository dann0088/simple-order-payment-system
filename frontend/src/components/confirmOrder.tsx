import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../App.css'

function ConfirmOrder() {
    const { paymentId } = useParams();

    console.log(paymentId);
    return (
        <div style={{marginTop: 50}}>
            <h2 style={{color : "white"}}>Confirm Order</h2>
            <h4 style={{color : "white"}}>Please print you receipt before closing this page.</h4>
            <Button>Print your receipt</Button>
        </div>
        );
    }
  
  export default ConfirmOrder;