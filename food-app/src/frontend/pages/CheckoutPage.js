// src/pages/CheckoutPage.js
import React, { useEffect, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css'; // 导入CSS文件

const CheckoutPage = () => {
  const { cart, total, calculateCartTotal } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    calculateCartTotal();
  }, [cart, calculateCartTotal]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: total,
          },
        },
      ],
    }).then((orderID) => {
      return orderID;
    });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async (details) => {
      alert('Transaction completed by ' + details.payer.name.given_name);
      await saveOrder();
    });
  };

  const saveOrder = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          address,
          phone,
          cart,
          total,
          status: 'pending', // 添加 status 字段
        }),
      });
  
      if (response.ok) {
        console.log('Order saved successfully');
      } else {
        console.error('Failed to save order');
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };  

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">Checkout</h2>
      <form className="checkout-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button type="button" className="place-order-button" onClick={saveOrder}>Place Order</button>
      </form>
      <div className="paypal-buttons">
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
