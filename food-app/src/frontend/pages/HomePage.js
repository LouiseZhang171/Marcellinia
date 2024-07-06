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
          {/* Add new menu items */}
          <div className="menu-item">
            <img src={`${process.env.PUBLIC_URL}/new-item-1.jpg`} alt="New Item 1" />
            <p>New Item 1</p>
          </div>
          <div className="menu-item">
            <img src={`${process.env.PUBLIC_URL}/new-item-2.jpg`} alt="New Item 2" />
            <p>New Item 2</p>
          </div>
          {/* You can add more new menu items */}
        </div>
      </div>
      <div className="weekly-specials">
        <h2>Weekly Specials</h2>
        <div className="special-items">
          {/* Add weekly special items */}
          <div className="special-item">
            <img src={`${process.env.PUBLIC_URL}/special-item-1.jpg`} alt="Special Item 1" />
            <p>Special Item 1</p>
          </div>
          <div className="special-item">
            <img src={`${process.env.PUBLIC_URL}/special-item-2.jpg`} alt="Special Item 2" />
            <p>Special Item 2</p>
          </div>
          {/* You can add more weekly special items */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
