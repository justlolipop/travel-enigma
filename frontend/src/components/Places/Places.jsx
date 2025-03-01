import { useState, useRef, useEffect } from "react";
import "./Places.css";
import { BasicDepthPacking } from "three";

const Places = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [backgroundImage, setBackgroundImage] = useState("");
  const sliderRefs = useRef({});

  const pahang = {
    data: [
      { placeName: "Pichuchu Land", state: "Alibaba, Pahang", button: "Book", image: "/image/anime.jpg", category: "Recommend" },
      { placeName: "FreeRider Land", state: "Labubu, Pahang", button: "Book", image: "/image/anime2.jpg", category: "Recommend" },
      { placeName: "Popo Land", state: "Diubaby, Pahang", button: "Book", image: "/image/anime3.jpg", category: "Recommend" },
      { placeName: "Zero Land", state: "Poker, Pahang", button: "Book", image: "/image/anime4.jpg", category: "Recommend" },
      { placeName: "Suffer Land", state: "Gold, Pahang", button: "Book", image: "/image/anime5.jpg", category: "Recommend" },
      { placeName: "Demon Land", state: "Sezy, Pahang", button: "Book", image: "/image/anime6.jpg", category: "Recommend" },
      { placeName: "Monster Land", state: "Underground, Pahang", button: "Book", image: "/image/anime2.jpg", category: "Recommend" },
      { placeName: "LaoGanMa Land", state: "APU, Pahang", button: "Book", image: "/image/anime2.jpg", category: "Resort" },
      { placeName: "Yanglao Land", state: "Shuijiao, Pahang", button: "Book", image: "/image/anime2.jpg", category: "Resort" },
      { placeName: "Suffer Land", state: "Niubi, Pahang", button: "Book", image: "/image/anime2.jpg", category: "Resort" },
      { placeName: "Tongku Land", state: "jiujiuwo, Pahang", button: "Book", image: "/image/anime2.jpg", category: "Resort" },
      { placeName: "ShengNe Land", state: "jiuming, Pahang", button: "Book", image: "/image/anime2.jpg", category: "Resort" },
      { placeName: "HaiHuo Land", state: "zhema, Pahang", button: "Book", image: "/image/anime2.jpg", category: "Resort" },
      { placeName: "Qiuqiu Land", state: "jieyao, Pahang", button: "Book", image: "/image/anime2.jpg", category: "Resort" },
    ],
  };

  const categories = ["All", ...new Set(pahang.data.map((place) => place.category))];

  const filteredPlaces = pahang.data.filter((place) => {
    const matchesSearch = place.placeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          place.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedData = filteredPlaces.reduce((acc, place) => {
    acc[place.category] = acc[place.category] || [];
    acc[place.category].push(place);
    return acc;
  }, {});

  const handleScroll = (category) => {
    if (sliderRefs.current[category]) {
      const slider = sliderRefs.current[category];
      const cards = slider.children;
      const containerWidth = slider.clientWidth;
      const scrollLeft = slider.scrollLeft;
      
      // Calculate the middle index
      let middleIndex = Math.round((scrollLeft + containerWidth / 2) / 300);
      middleIndex = Math.max(0, Math.min(middleIndex, cards.length - 1));

      // Get the image of the middle card
      const newImage = cards[middleIndex]?.querySelector("img")?.src;
      if (newImage && newImage !== backgroundImage) {
   
        setBackgroundImage(newImage); // Update the background image
      }
    }
  };

  useEffect(() => {
    // Set the initial background image only if it's not set
    if (!backgroundImage) {
      const firstCategory = Object.keys(groupedData)[0];
      if (firstCategory && groupedData[firstCategory]?.length > 0) {
        setBackgroundImage(groupedData[firstCategory][0].image);
      }
    }
  }, [groupedData]); // Remove `backgroundImage` from dependency to prevent reset

  useEffect(() => {
    // Set the initial background image
    console.log("currentimg:", backgroundImage)
  
  }, [backgroundImage]);


  return (
    <section className="places-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="places-container">
        <input
          type="text"
          placeholder="Search places..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-button ${selectedCategory === category ? "active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="places-list">
          {Object.keys(groupedData).map((category) => (
            <div key={category} className="category-section">
              <h2>{category}</h2>
              <div className="slider-wrapper">
                <button className="slider-button left" onClick={() => sliderRefs.current[category]?.scrollBy({ left: -300, behavior: "smooth" })}>
                  <i className="fa-solid fa-arrow-left"></i>
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
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Places;
