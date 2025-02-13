//Halaman Dashboard = menampilkan total produk yg ada di db

import React, { useEffect, useState } from "react";  // Import React and the necessary hooks (useState, useEffect)
import Layout from "../components/Layout";  // Import the Layout component to wrap the page content
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  // Ambil URL dari .env

const Dashboard = () => {
  // State to store the total number of products, initialized to 0
  const [totalProducts, setTotalProducts] = useState(0);

  // useEffect hook to fetch the product data when the component is mounted (ambil data produk from backend)
  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)  // Make a GET request to the API to fetch products
      .then((response) => response.json())  // Parse the response as JSON
      .then((data) => setTotalProducts(data.data.length));  // Set the total products count to the length of the returned data
  }, []);  // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <Layout>  
      <h1>Dashboard</h1> 
      <div
        style={{
          padding: "20px",  // Add padding inside the div
          backgroundColor: "gray",  // Set the background color to gray
          color: "white",  // Set the text color to white
          borderRadius: "8px",  // Round the corners of the div
          width: "200px",  // Set the width of the div
          textAlign: "center",  // Center-align the text inside the div
        }}
      >
        <h3>Total Products</h3>  {/* Heading for the total products */}
        <h2>{totalProducts}</h2>  {/* Display the total number of products */}
      </div>
    </Layout>
  );
};

export default Dashboard;
