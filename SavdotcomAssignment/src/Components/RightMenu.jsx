import React, { useEffect, useState, useMemo } from "react";
import "../Components/CSS/RighttMenu.css";

const RightMenu = ({ products, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [...new Set(products.map((product) => product.category))];
  const prices = ["50-100", "101-200", "201-300", "301-400"];
  const ratings = [1, 2, 3, 4, 5];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (price) => {
    setSelectedPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const priceRange = selectedPrices.some((price) => {
        const [min, max] = price.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });

      return (
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        (selectedPrices.length === 0 || priceRange) &&
        (selectedRatings.length === 0 ||
          selectedRatings.includes(Math.round(product.rating.rate)))
      );
    });
  }, [products, selectedCategories, selectedPrices, selectedRatings]);

  useEffect(() => {
    onFilterChange(filteredProducts);
  }, [filteredProducts, onFilterChange]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
    setSelectedRatings([]);
  };

  return (
    <>
      <button className="filter-button" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "Close" : "Filters"}
      </button>

      <div className={`right-sidebar ${menuOpen ? "open" : ""}`}>
        <div>
          <h3 className="heading-font">All categories</h3>
          {categories.map((category, index) => (
            <div key={index}>
              <input
                className="right-spacing"
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>

        <hr />
        <div>
          <h3 className="heading-font">Price</h3>
          {prices.map((price, index) => (
            <div key={index}>
              <input
                className="right-spacing"
                type="checkbox"
                checked={selectedPrices.includes(price)}
                onChange={() => handlePriceChange(price)}
              />
              ${price.split("-").join(" - $")}
            </div>
          ))}
        </div>

        <hr />
        <div>
          <h3 className="heading-font">Ratings</h3>
          {ratings.map((rating, index) => (
            <div key={index}>
              <input
                className="right-spacing"
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
              />
              {"★".repeat(rating)}
            </div>
          ))}
        </div>

        <hr />
        <br />
        <button onClick={clearFilters} className="button-clear">
          Clear
        </button>
      </div>
    </>
  );
};

export default RightMenu;
