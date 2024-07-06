import React, { useState } from 'react';
import Slider from 'react-slick';
import './ImageCarousel.css';
import { useNavigate } from 'react-router-dom';

const ImageCarousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: '0',
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => setSlideIndex(next)
  };

  const items = [
    {
      image: `${process.env.PUBLIC_URL}/burger.png`,
      alt: 'Slide 1',
      title: 'Delicious Burger',
      description: 'Experience the taste of our delicious burger.',
      link: '/product/1'
    },
    {
      image: `${process.env.PUBLIC_URL}/pizza.jpg`,
      alt: 'Slide 2',
      title: 'Tasty Pizza',
      description: 'Try our tasty and freshly baked pizza.',
      link: '/product/2'
    },
    {
      image: `${process.env.PUBLIC_URL}/pasta.png`,
      alt: 'Slide 3',
      title: 'Yummy Pasta',
      description: 'Enjoy our yummy and creamy pasta.',
      link: '/product/3'
    }
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className={slideIndex === index ? "activeSlide" : "slide"}>
            <div className="carousel-content">
              <div className="image-container">
                <img src={item.image} alt={item.alt} />
              </div>
              <div className="description-container">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button onClick={() => navigate(item.link)}>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      onClick={onClick}
    >
      &gt;
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      onClick={onClick}
    >
      &lt;
    </div>
  );
};

export default ImageCarousel;






