import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuPage.css';
import { useCart } from '../context/CartContext';

const menuItems = [
  { id: 1, name: 'Pizza', description: 'Delicious cheese pizza', ingredients: 'Cheese, Tomato, Dough', image: '/pizza.png', price: 20 },
  { id: 2, name: 'Burger', description: 'Juicy beef burger', ingredients: 'Beef, Lettuce, Tomato, Bun', image: '/burger.png', price: 15 },
  { id: 3, name: 'Pasta', description: 'Tasty pasta with tomato sauce', ingredients: 'Pasta, Tomato Sauce, Cheese', image: '/pasta.png', price: 25 },
  { id: 4, name: 'Drink', description: 'Refreshing drinks', ingredients: 'Various beverages', image: '/drink.png', price: 5 },
  { id: 5, name: 'Wine', description: 'Fine wine selection', ingredients: 'Various wines', image: '/wine.png', price: 35 }
];

const MenuPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateCartItem, removeFromCart, total, calculateCartTotal } = useCart();
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
  const [quantity, setQuantity] = useState(1);
  const [itemTotal, setItemTotal] = useState(selectedItem.price);

  useEffect(() => {
    setItemTotal(selectedItem.price * quantity);
  }, [quantity, selectedItem]);

  useEffect(() => {
    const cartItem = cart.find(item => item.id === selectedItem.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cart, selectedItem]);

  useEffect(() => {
    calculateCartTotal();
  }, []);

  const handleAddToCart = () => {
    const cartItem = cart.find(item => item.id === selectedItem.id);
    if (quantity === 0) {
      removeFromCart(selectedItem);
    } else if (cartItem) {
      updateCartItem(selectedItem, quantity);
    } else {
      addToCart(selectedItem, quantity);
    }
    calculateCartTotal();
  };

  const handleQuantityChange = (value) => {
    if (value === "") {
      setQuantity("");
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        setQuantity(Math.max(0, Math.min(99, numValue)));
      }
    }
  };

  const handleInputChange = (e) => {
    handleQuantityChange(e.target.value);
  };

  return (
    <div className="menu-page">
      <div className="menu-list">
        <h2>Menu</h2>
        {menuItems.map(item => (
          <div key={item.id} className="menu-item" onClick={() => { setSelectedItem(item); setQuantity(1); }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
      <div className="menu-details">
        <h2>{selectedItem.name}</h2>
        <img src={selectedItem.image} alt={selectedItem.name} />
        <p>{selectedItem.description}</p>
        <p><strong>Ingredients:</strong> {selectedItem.ingredients}</p>
        <p><strong>Price:</strong> ${selectedItem.price}</p>
        <div>
          <button className="quantity-button" onClick={() => handleQuantityChange(quantity - 1)}>-</button>
          <input
            type="text"
            value={quantity}
            onChange={handleInputChange}
            style={{ width: '50px', textAlign: 'center' }}
          />
          <button className="quantity-button" onClick={() => handleQuantityChange(quantity + 1)}>+</button>
          <button className="confirm-button" onClick={handleAddToCart}>Confirm</button>
        </div>
        <p>Total for this item: ${itemTotal}</p>
        <p>Cart Total: ${total}</p>
        <button className="go-to-cart-button" onClick={() => navigate('/cart')}>Go to Cart</button>
      </div>
    </div>
  );
};

export default MenuPage;













