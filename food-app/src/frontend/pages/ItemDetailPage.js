import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ItemDetailPage = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const item = { id, name: 'Item Name', description: 'Item Description', price: 10, ingredients: 'Item Ingredients', image: '/item.png' }; // Replace with actual data
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(getItemQuantity(id));
  }, [id, getItemQuantity]);

  const handleAddToCart = () => {
    addToCart(item, 1);
    setQuantity(getItemQuantity(id));
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      removeFromCart(item, 1);
      setQuantity(getItemQuantity(id));
    }
  };

  return (
    <div>
      <h1>{item.name}</h1>
      <img src={item.image} alt={item.name} />
      <p>{item.description}</p>
      <p><strong>Ingredients:</strong> {item.ingredients}</p>
      <p><strong>Price:</strong> ${item.price}</p>
      <div>
        <button onClick={handleRemoveFromCart}>-</button>
        <input type="number" value={quantity} readOnly />
        <button onClick={handleAddToCart}>+</button>
      </div>
      <p><strong>Total for this item:</strong> ${item.price * quantity}</p>
    </div>
  );
};

export default ItemDetailPage;





