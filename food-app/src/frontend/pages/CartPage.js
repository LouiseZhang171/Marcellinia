import React, { useState } from 'react';
import Modal from 'react-modal';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

Modal.setAppElement('#root');

const CartPage = () => {
  const { cart,  updateCartItem, removeFromCart, total } = useCart();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();

  const openModal = (item) => {
    setItemToRemove(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setItemToRemove(null);
    setModalIsOpen(false);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(itemToRemove);
    closeModal();
  };

  const handleQuantityChange = (item, value) => {
    const newQuantity = item.quantity + value;
    if (newQuantity <= 0) {
      openModal(item);
    } else {
      updateCartItem(item, newQuantity);
    }
  };

  const handleInputChange = (item, value) => {
    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= 99) {
      if (newQuantity === 0) {
        openModal(item);
      } else {
        updateCartItem(item, newQuantity);
      }
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>{item.quantity} x ${item.price}</p>
              </div>
              <div className="quantity-controls">
                <button className="quantity-button" onClick={() => handleQuantityChange(item, -1)}>-</button>
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => handleInputChange(item, e.target.value)} 
                  min="0" 
                  max="99" 
                />
                <button className="quantity-button" onClick={() => handleQuantityChange(item, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <h2>Total: ${total}</h2>
      <button className="proceed-button" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Remove Item"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Removal</h2>
        <p>Are you sure you want to remove {itemToRemove?.name} from the cart?</p>
        <button onClick={handleRemoveFromCart}>Yes</button>
        <button onClick={closeModal}>No</button>
      </Modal>
    </div>
  );
};

export default CartPage;
