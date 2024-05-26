import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavBar from './components/navBar';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  let localCartCount : any = localStorage.getItem("cartCount");
  return (
    <>
    <div className='landing-page'>
      <NavBar quantity={(localCartCount !== undefined) ? localCartCount : 0}/>
      <div className='py-5 justify-content-md-center'>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="center-nav">
      <h2 style={{color: 'white'}}>React + Vite</h2>
      </div>
    </div>
    </>
  )
}

export default App
