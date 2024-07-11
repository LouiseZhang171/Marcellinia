import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './frontend/pages/HomePage';
import MenuPage from './frontend/pages/MenuPage';
import ItemDetailPage from './frontend/pages/ItemDetailPage';
import CartPage from './frontend/pages/CartPage';
import CheckoutPage from './frontend/pages/CheckoutPage';
import OrderConfirmationPage from './frontend/pages/OrderConfirmationPage';
import Login from './frontend/auth/Login';
import Register from './frontend/auth/Register';
import CustomerDashboard from './frontend/roles/customer/CustomerDashboard';
import SellerDashboard from './frontend/roles/seller/SellerDashboard';
import AdminDashboard from './frontend/roles/admin/AdminDashboard';
import Header from './frontend/components/Header';
import Footer from './frontend/components/Footer';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import './App.css';

const initialOptions = {
  "client-id": "AVBixkNKGG806prxVJuYkGh93LM7W17d_rBl98WlNxbpULoPJrG9R0IJe5vb0ZFu5V7zUmXW15dMyACI",
  currency: "USD",
  intent: "capture",
};

function App() {
  return (
    <PayPalScriptProvider options={initialOptions}>
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
            <Route path="/register" element={<Register />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;




