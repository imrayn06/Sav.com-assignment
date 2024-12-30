import React, { useEffect, useState } from "react";
import "../Components/CSS/Product.css"; // Import the CSS file
import RightMenu from "./RightMenu";
import { useNavigate } from "react-router-dom";

const Products = ({ products }) => {
  console.log("products", products);
  const [searchItem, setsearchItem] = useState("");
  const [currentSelectedProducts, setCurrentSelectedProducts] =
    useState(products); //for drag and drop selection
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9; 
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleSearch = (e) => {
    setsearchItem(e.target.value);
    setCurrentPage(1); // reset to page 1 when searching
  }; // Filter

  const filteredProducts = currentSelectedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchItem.toLowerCase())
  ); // Get the products

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  ); // Change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber); // previous page

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }; // next page

  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("draggedIndex", index);
  };

  const onDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("draggedIndex");
    const updatedProducts = [...currentProducts];
    const [movedProduct] = updatedProducts.splice(draggedIndex, 1);
    updatedProducts.splice(index, 0, movedProduct); // Insert the dragged item at the new position
    setCurrentSelectedProducts(updatedProducts); // Update the product list after drag

    e.preventDefault();
  };

  console.log("currentProduct", currentSelectedProducts);

  const onDragOver = (e) => {
    e.preventDefault(); // allow dropping of product
  };

  useEffect(() => {
    // Lazy Loading
    setLoading(true);
    setTimeout(() => {
      setCurrentSelectedProducts(products);
      setLoading(false);
    }, 1000);
  }, [products]);

  if (loading) {
    return (
      <div className="loading-container">
         <div className="spinner"></div> <p>Loading...</p>{" "}
      </div>
    );
  }

  return (
    <div>
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#f4f4f4",
          borderBottom: "1px solid #ddd",
          margin: "15px",
        }}
      >
         <h2>Products</h2>{" "}
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 15px",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
           Logout {" "}
        </button>
        {" "}
      </div>
       {/* Search Input and Button */}{" "}
      <div className="search-container">
        {" "}
        <input
          type="text"
          placeholder="Search products..."
          value={searchItem}
          onChange={handleSearch}
          className="search-input"
        />
         <button className="search-button">Search</button>
        {" "}
        <RightMenu
          products={products}
          onFilterChange={setCurrentSelectedProducts}
        />
        {" "}
      </div>
       {/* Scrollable Container */}{" "}
      <div className="products-scroll-container">
        {" "}
        <div className="products-container">
          {" "}
          {currentProducts.map((pro, index) => (
            <div
              key={pro.id}
              className="product-card"
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
            >
               <h4>{pro.title.slice(0, 10)} </h4>
              <img src={pro.image} alt="image" />{" "}
              <p>
                <b>Category:</b> {pro.category}{" "}
              </p>
              <p>Description : {pro.description.slice(0, 35)}</p>
              <h4>Price: ${pro.price}</h4>{" "}
              <div className="button-group">
                {" "}
                <button className="buy-now-button">Buy now</button>
                <button className="add-to-cart-button">Add to cart</button>
                {" "}
              </div>
              {" "}
            </div>
          ))}
          {" "}
        </div>
        {" "}
      </div>
      {/* Pagination */}{" "}
      <div
        className="pagination"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <button
          style={{
            border: "1px solid gray",
            BackgroundColor: "pink",
            gap: "3px",
            borderRadius: "5px",
            padding: "5px",
            margin: "0px 5px 5px 5px",
            cursor: "pointer",
          }}
          onClick={goToPreviousPage}
        >
          Previous {" "}
        </button>
        {" "}
        {Array.from(
          { length: Math.ceil(filteredProducts.length / itemsPerPage) },
          (_, index) => (
            <button
              style={{
                border: "1px solid gray",
                BackgroundColor: "pink",
                gap: "3px",
                borderRadius: "5px",
                padding: "5px",
                margin: "0px 5px 5px 5px",
                cursor: "pointer",
              }}
              key={index + 1}
              onClick={() => paginate(index + 1)}
            >
               {index + 1}{" "}
            </button>
          )
        )}
        {" "}
        <button
          style={{
            border: "1px solid gray",
            BackgroundColor: "pink",
            gap: "3px",
            borderRadius: "5px",
            padding: "5px",
            margin: "0px 5px 5px 5px",
            cursor: "pointer",
          }}
          onClick={goToNextPage}
        >
         Next {" "}
        </button>
        {" "}
      </div>
      {" "}
    </div>
  );
};

const MemoizedProduct = React.memo(Products);

export default MemoizedProduct;
