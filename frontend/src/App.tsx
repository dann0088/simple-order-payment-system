import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import NavBar from './components/navBar';
import shortUUID from 'short-uuid';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  let sessionId : any = localStorage.getItem('sessionId');
  if (sessionId == null && sessionId == undefined) {
    localStorage.setItem("sessionId", shortUUID.generate());
  }

  useEffect(() => {
    let sessionId : any = localStorage.getItem('sessionId');
    if (sessionId == null && sessionId == undefined) {
      sessionId = shortUUID.generate()
      localStorage.setItem("sessionId", sessionId);
    }
    let ignore = false;
    async function startFetching() {
      const returnData = await fetchProductDetails(sessionId);
      if (!ignore) {
        console.log(returnData);
      }
    }

    startFetching();
    return() => {
      ignore = true
    };
  }, []);

  const fetchProductDetails = async (p_id: string | any) => {
    try {
      if (p_id == null || p_id == undefined) {
        throw new Error("Undefined session ID");
      }
      const response = await fetch(import.meta.env.VITE_API_URL + "order/getCart/" + p_id, {
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
