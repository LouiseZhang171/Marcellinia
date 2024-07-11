import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './MenuPage.css';
import menuItems from '../context/menuItems';
import { useCart } from '../context/CartContext';

Modal.setAppElement('#root'); // 这是为了无障碍访问

const MenuPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Pizza');
  const [openCategories, setOpenCategories] = useState(['Pizza', 'Burger']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const { cart, addToCart, updateCartItem, removeFromCart, total, calculateCartTotal } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [itemTotal, setItemTotal] = useState(0);

  useEffect(() => {
    if (!selectedCategory && openCategories.length > 0) {
      setSelectedCategory(openCategories[0]);
    }
  }, [openCategories, selectedCategory]);

  useEffect(() => {
    setItemTotal(modalItem ? modalItem.price * quantity : 0);
  }, [quantity, modalItem]);

  useEffect(() => {
    const cartItem = cart.find(item => item.id === (modalItem ? modalItem.id : null));
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cart, modalItem]);

  useEffect(() => {
    calculateCartTotal();
  }, [cart]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (openCategories.includes(category)) {
      setOpenCategories(openCategories.filter(cat => cat !== category));
    } else {
      setOpenCategories([...openCategories, category]);
    }
  };

  const handleItemClick = (item) => {
    setModalItem(item);
    setIsModalOpen(true);
    const cartItem = cart.find(cartItem => cartItem.id === item.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalItem(null);
  };

  const handleAddToCart = () => {
    const cartItem = cart.find(item => item.id === modalItem.id);
    if (quantity === 0) {
      removeFromCart(modalItem);
    } else if (cartItem) {
      updateCartItem(modalItem, quantity);
    } else {
      addToCart(modalItem, quantity);
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

  const categories = [...new Set(menuItems.map(item => item.category))];

  const filteredItems = selectedCategory
    ? menuItems.filter(item => item.category === selectedCategory)
    : [];

  return (
    <div className="menu-page">
      <div className="menu-list">
        <h2>Menu</h2>
        {categories.map(category => (
          <div key={category} className={`menu-category ${selectedCategory === category ? 'selected' : ''}`}>
            <h3 onClick={() => handleCategoryClick(category)}>
              {category}
              <span>{openCategories.includes(category) ? '▼' : '▶'}</span>
            </h3>
            {openCategories.includes(category) && (
              <div className="category-items">
                {menuItems.filter(item => item.category === category).map(item => (
                  <div key={item.id} className="menu-item" onClick={() => handleItemClick(item)}>
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="item-detail">
          <h2>{selectedCategory}</h2>
          <div className="item-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="item-card" onClick={() => handleItemClick(item)}>
                <img src={item.image} alt={item.name} />
                <div className="text-content">
                  <p className="name">{item.name}</p>
                  <p className="price">Price: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalItem && (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="Modal" overlayClassName="Overlay">
          <div className="modal-header">
            <h2>{modalItem.name}</h2>
            <button className="close-modal-button" onClick={closeModal}>✖</button>
          </div>
          <img src={modalItem.image} alt={modalItem.name} className="modal-image" />
          <div className="modal-info">
            <p>{modalItem.description}</p>
            <p><strong>Ingredients:</strong> {modalItem.ingredients}</p>
            <p><strong>Price:</strong> ${modalItem.price}</p>
          </div>
          <div className="modal-quantity">
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
          <div className="cart-info">
            <p>Total for this item: ${itemTotal}</p>
            <p>Cart Total: ${total}</p>
            <button className="go-to-cart-button" onClick={() => navigate('/cart')}>Go to Cart</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MenuPage;
