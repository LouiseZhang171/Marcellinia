import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Online Food Ordering Website</h1>
      <ImageCarousel />
      <div className="new-menu">
        <h2>New Arrivals</h2>
        <div className="menu-items">
          <div className="menu-item">
            <img src={`${process.env.PUBLIC_URL}/pizza2.jpg`} alt="New Item" />
            <div className="item-description">
              <p>New Pizza</p>
              <p>A delicious new pizza with fresh ingredients.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="weekly-specials">
        <h2>Weekly Specials</h2>
        <div className="special-items">
          <div className="special-item">
            <img src={`${process.env.PUBLIC_URL}/pizzaC.png`} alt="Special Item" />
            <div className="item-description">
              <p>Special Pizza</p>
              <p>Our special pizza with a unique blend of flavors. Only $10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

