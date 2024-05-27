import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import shortUUID from 'short-uuid';
import App from './App.tsx';
import Products from './components/products.tsx';
import ProductDetails from './components/productDetails.tsx';
import Cart from './components/cart.tsx';
import ConfirmOrder from './components/confirmOrder.tsx';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Checkout from './components/checkout.tsx';

let sessionId : any = localStorage.getItem('sessionId');
if (sessionId == null && sessionId == undefined) {
  sessionId = shortUUID.generate();
  localStorage.setItem("sessionId", sessionId);

  let cartCount : any = localStorage.getItem('cartCount');
  if (cartCount == null && cartCount == undefined) {
    try {
      if (sessionId == null || sessionId == undefined) {
        throw new Error("Undefined guest session id");
      }
      const response = await fetch(import.meta.env.VITE_API_URL + "cart/count/" + sessionId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw response;
      }
      const responseData =  await response.json();
      localStorage.setItem("cartCount", responseData.count)
    } catch (error) {
      console.log('Error:', error);
      localStorage.setItem("cartCount", '0')
    }
  }
}

const fetchUserCartList = async () => {
  console.log(sessionId);
  try {
    if (sessionId == null || sessionId == undefined) {
      throw new Error("Undefined session ID");
    }
    const response = await fetch(import.meta.env.VITE_API_URL + "cart/get/" + sessionId, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw response;
    }
    return await response.json();
      
  } catch (error) {
    return error;
  }
}

const fetchProducts = async () => {
  try {
    var apiUrl : string = import.meta.env.VITE_API_URL + "product/getAll";
    const response : any = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw response;
    }
    return await response.json();
  } catch (error : any) {
    return error;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/products",
    element: <Products/>,
    loader: fetchProducts
  },
  {
    path: "/product/:productId",
    element: <ProductDetails/>
  },
  {
    path: "/cart",
    element: <Cart/>,
    loader: fetchUserCartList
  },
  {
    path: "/checkout",
    element: <Checkout/>,
    loader: fetchUserCartList
  },
  {
    path: "/confirmOrder/:orderId",
    element: <ConfirmOrder/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)


