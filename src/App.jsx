import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import { useContext } from "react";
import { CartContext } from "./context/CartContext";

function App() {
  const { cart } = useContext(CartContext);
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link to="/" className="navbar-brand text-white">
          E-Shop
        </Link>

        <Link to="/cart" className="btn btn-warning">
          Cart ({cart.length})
        </Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<ProductDetails /> // 👉 :id → dynamic route parameter
        } />
      </Routes>
    </>
  )
}

export default App
