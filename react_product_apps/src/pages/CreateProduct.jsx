//Create Product Page

import React, { useState } from "react";  // Import React and useState hook
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
import Layout from "../components/Layout";  // Import Layout component to wrap content
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  // Ambil URL dari .env

const CreateProduct = () => {
  // Inisialisasi state to manage product data (name, price, description)
  // Updated based user's input
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  
  // useNavigate hook digunakan untuk berpindah halaman setelah produk berhasil ditambahkan
  const navigate = useNavigate(); 

  // Handle form input changes and update product state
  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });  // Dynamically update respective fields (key:value)

  // Handle form submission when creating a new product
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    fetch(`${API_BASE_URL}/products`, {
      method: "POST",  // Use POST method to create a new product (POST=create)
      headers: { "Content-Type": "application/json" },  // Set content-type as JSON
      body: JSON.stringify(product),  // Send the product data object as JSON string in the request body
    })
      .then((response) => response.json())  // Parse the response to JSON
      .then((data) => {
        alert(data.message);  // Show a message returned from the server (success or error)
        if (data.status === true) {  // If product creation is successful, navigate to products list
          navigate("/products");
        }
      });
  };

  return (
    <Layout>  
      <h1>Create Product</h1>  

      <form onSubmit={handleSubmit}>  
        <input
          type="text"  // Input for product name
          name="name"  // Field name for product name
          placeholder="Product Name"  // Placeholder text for input field
          onChange={handleChange}  // Call handleChange when input value changes (agar state diperbarui setiap kali pengguna mengetik)
          required  // Make this field required
        />
        <input
          type="number"  // Input for product price
          name="price"  // Field name for product price
          placeholder="Price"  // Placeholder text for input field
          onChange={handleChange}  // Call handleChange when input value changes (agar state diperbarui setiap kali pengguna mengetik)
          required  // Make this field required
        />
        <textarea
          name="description"  // Textarea for product description
          placeholder="Description"  // Placeholder text for textarea
          onChange={handleChange}  // Call handleChange when textarea value changes (agar state diperbarui setiap kali pengguna mengetik)
          required  // Make this field required
        ></textarea>
        <button type="submit">Save</button>  
      </form>
    </Layout>
  );
};

export default CreateProduct;
