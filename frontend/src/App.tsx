import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavBar from './components/navBar';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  
  return (
    <>
    <div className='landing-page'>
      <NavBar/>
      <div className='py-5 justify-content-md-center'>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="center-nav">
        <Link to="/products"><Button size="lg" variant="primary"><b>VIEW PRODUCTS</b></Button></Link>
      </div>
    </div>
    </>
  )
}

export default App
