import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import '../App.css'

function NavBar() {
    return (
      <Navbar className="bg-body-tertiary navbar">
        <Container>
            <Navbar.Brand className="homeName">Simple order and payment</Navbar.Brand>
            <Navbar.Text className="cart">
                <a href="#">Cart(0)</a>
            </Navbar.Text>
            
        </Container>
      </Navbar>
    );
  }
  
  export default NavBar;