import { useRef, useState, useEffect } from "react";
import "./PlacesSlider.css";

const PlacesSlider = ({ groupedData, onImageChange }) => {
  const sliderRefs = useRef({});
  const [centerImages, setCenterImages] = useState({});

  const handleScroll = (category) => {
    if (sliderRefs.current[category]) {
      const slider = sliderRefs.current[category];
      const cards = slider.children;
      const containerWidth = slider.clientWidth;
      const scrollLeft = slider.scrollLeft;
      
      let middleIndex = Math.round((scrollLeft + containerWidth / 2) / 300);
      middleIndex = Math.max(0, Math.min(middleIndex, cards.length - 1));

      const newImage = cards[middleIndex]?.querySelector("img")?.src;
      if (newImage && newImage !== centerImages[category]) {
        setCenterImages((prev) => ({ ...prev, [category]: newImage }));
        onImageChange(newImage); // Update background
      }
    }
  };

  useEffect(() => {
    Object.keys(groupedData).forEach((category) => {
      if (groupedData[category]?.length > 0) {
        setCenterImages((prev) => ({
          ...prev,
          [category]: groupedData[category][0].image,
        }));
        onImageChange(groupedData[category][0].image);
      }
    });
  }, [groupedData, onImageChange]);

  return (
    <div className="places-list">
      {Object.keys(groupedData).map((category) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="slider-wrapper">
            <button className="slider-button left" onClick={() => sliderRefs.current[category]?.scrollBy({ left: -300, behavior: "smooth" })}>
            <i class="fa-solid fa-arrow-left"></i>
            </button>
            <div
              className="slider-container"
              ref={(el) => (sliderRefs.current[category] = el)}
              onScroll={() => handleScroll(category)}
            >
              {groupedData[category].map((place, index) => (
                <div key={index} className="place-card">
                  <img src={place.image} alt={place.placeName} className="place-image" />
                  <h3>{place.placeName}</h3>
                  <p>{place.state}</p>
                  <button className="book-button">{place.button}</button>
                </div>
              ))}
            </div>
            <button className="slider-button right" onClick={() => sliderRefs.current[category]?.scrollBy({ left: 300, behavior: "smooth" })}>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlacesSlider;
