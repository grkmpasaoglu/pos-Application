import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import BillsPage from './pages/BillsPage'
import CustomerPage from './pages/CustomerPage'
import StatisticPage from './pages/StatisticPage'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import ProductPage from './pages/ProductPage'
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={
            <RouteControl>
              <HomePage />
            </RouteControl>} />
        <Route path="/cart" element={<RouteControl><CartPage /></RouteControl>} />
        <Route path="/bills" element={<RouteControl><BillsPage /></RouteControl>} />
        <Route path="/customer" element={<RouteControl><CustomerPage /></RouteControl>} />
        <Route path="/statistics" element={<RouteControl><StatisticPage /></RouteControl>} />
        <Route path="/products" element={<RouteControl><ProductPage /></RouteControl>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  )
}
export default App


export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children
  }
  else {
    return <Navigate to={"/login"} />
  }
}