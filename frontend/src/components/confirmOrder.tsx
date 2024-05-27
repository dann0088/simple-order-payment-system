import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import '../App.css'
import ErrorModal from './modals/errorModal';
import { useState } from 'react';

function ConfirmOrder() {
  const { orderId } = useParams();
  const [showErrorModal, updateErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const generateInvoice = async () => {
    try {
      if (orderId == null || orderId == undefined) {
        throw new Error("Undefined order id");
      }
      let response : any = await fetch(import.meta.env.VITE_API_URL + "order/invoice/" + orderId, {
        method: "POST",
        headers: {
            "Content-Type": "application/pdf",
        },
      });
      if (!response.ok) {
        throw await response.json();
      }

      return response.blob().then((blob : any) => {
        // Creating new object of PDF file
        const fileURL =
          window.URL.createObjectURL(blob);
              
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "orderInvoice.pdf";
        alink.click();
      });
    } catch (error: any) {
      console.error(error)
      setErrorMessage(error.message);
      toggleModal();
    }
  }
  const toggleModal = () => updateErrorModal(state => !state);

  console.log(orderId);
  return (
      <div style={{marginTop: 50}}>
          <Button variant='link'><Link to={"/"}>Back to Home</Link></Button>
          <h1 style={{color : "white"}}>Confirm Order</h1>
          <h5 style={{color : "white"}}>Please print you invoice before closing this page.</h5>
          <Button onClick={generateInvoice}>Print your invoice</Button>
          <ErrorModal canShow={showErrorModal} updateModalState={toggleModal} message={errorMessage} />
      </div>
      
      );
  }

export default ConfirmOrder;