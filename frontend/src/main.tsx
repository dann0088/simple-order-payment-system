import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Products from './components/products.tsx';
import ProductDetails from './components/productDetails.tsx';
import Cart from './components/cart.tsx';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


const fetchProducts = async () => {
  try {
    var apiUrl : string = import.meta.env.VITE_API_URL + "product/getAll";
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
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
    path: "/product/:id",
    element: <ProductDetails/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)


