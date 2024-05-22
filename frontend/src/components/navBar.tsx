import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
// import '../App.css'
type Props = {
  quantity: number
}

function NavBar({quantity} : Props) {
  
    return (
      <Navbar className="bg-body-tertiary navbar">
        <Container>
            <Navbar.Brand className="homeName"><b>Exercise</b></Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="/products">Products</Nav.Link>
          </Nav>
            <Navbar.Text className="cart">
            <Link to={"/cart"}><b>Cart({quantity})</b></Link>
            </Navbar.Text>
            
        </Container>
      </Navbar>
    );
  }
  
  export default NavBar;