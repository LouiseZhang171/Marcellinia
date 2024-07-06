// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './frontend/pages/HomePage';
import MenuPage from './frontend/pages/MenuPage';
import ItemDetailPage from './frontend/pages/ItemDetailPage';
import CartPage from './frontend/pages/CartPage';
import CheckoutPage from './frontend/pages/CheckoutPage';
import OrderConfirmationPage from './frontend/pages/OrderConfirmationPage';
import Login from './frontend/auth/Login';
import CustomerDashboard from './frontend/roles/customer/CustomerDashboard';
import SellerDashboard from './frontend/roles/seller/SellerDashboard';
import Header from './frontend/components/Header';
import Footer from './frontend/components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
