import { Button, Modal } from 'react-bootstrap';
// import '../App.css'

type Props = {
    canShow: boolean
    updateModalState: any
    message : string
}

function ErrorModal({ canShow, updateModalState, message } : Props) {
    return (
        <Modal
        show={canShow}
        onHide={updateModalState}
        backdrop="static"
        keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Error encountered</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {message}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updateModalState}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        );
    }
  
  export default ErrorModal;