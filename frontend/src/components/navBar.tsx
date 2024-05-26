import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
// import '../App.css'

type Props = {
  quantity? : number
}

function NavBar({quantity} : Props) {
  // const [cartCount, setCartCount] = useState<number>(0);

  // useEffect(() => {
  //   let ignore = false;
  //   async function startFetching() {
  //     let response : any = await fetchCartCount();
  //     if (!ignore) {
  //       console.log(response);
  //       setCartCount(response.data);
  //     }
  //   }
  //   startFetching();
  //   return() => {
  //     ignore = true
  //   };
  // }, [cartCount]);

  // const fetchCartCount = async () => {
  //   try {
  //     if (sessionId == null || sessionId == undefined) {
  //       throw new Error("Undefined guest session id");
  //     }
  //     const response = await fetch(import.meta.env.VITE_API_URL + "cart/count/" + sessionId, {
  //       method: "GET",
  //       headers: {
  //           "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  // let localCartList = JSON.parse(localStorage.getItem("cartList") || "[]");
  // console.log(localCartList);
  return (
    <Navbar className="bg-body-tertiary navbar">
      <Container>
          <Navbar.Brand className="homeName"><b>Exercise</b></Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
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