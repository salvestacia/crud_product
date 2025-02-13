//Edit Product Page based on id

import React, { useEffect, useState } from "react";  // Import React, useState, and useEffect hooks
import { useNavigate, useParams } from "react-router-dom";  // Import useNavigate for navigation and useParams to access route parameters
import Layout from "../components/Layout";  // Import Layout component to wrap the page content
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  // Ambil URL dari .env

const EditProduct = () => {
  const { id } = useParams();  // Get the product ID from the URL parameter
  // State to manage product data (name, price, description)
  // State ini menyimpan informasi produk yang akan diedit
  // Nilai awalnya kosong dan akan diisi setelah data diambil dari backend
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });  

  // useNavigate hook digunakan untuk berpindah halaman setelah produk berhasil diedit
  const navigate = useNavigate();  // useNavigate hook to navigate between pages

  // useEffect hook to fetch product data when the component mounts or when the id changes
  useEffect(() => {
    fetch(`${API_BASE_URL}/products/${id}`)  // Make an API call to fetch product details based on the id
      .then((response) => response.json())  // Parse the response to JSON
      .then((data) => {
        if (data.status === true) {
          setProduct(data.data);  // If product found, set the product data in state from backend
        } else {
          // If product is not found, show an alert and navigate back to the product list
          alert('Ops, data product dengan id ' + id + " tidak ditemukan!");
          navigate("/products");
        } 
      });
  }, [id]);  // Dependency array includes id to re-fetch data when id changes

  // Handle form input changes to update the product state
  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });  // Dynamically update the respective field in product state

  // Handle form submission (submit the updated product data)
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior (auto reload)
    fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",  // Use PUT method to update the product (PUT=update)
      headers: { "Content-Type": "application/json" },  // Set content-type as JSON
      body: JSON.stringify(product),  // Send the product data object as JSON string in the request body
    })
      .then((response) => response.json())  // Parse the response to JSON
      .then((data) => {
        alert(data.message);  // Show a message from the server (success or error)
        if (data.status === true) {
          navigate('/products');  // If update is successful, navigate to the product list
        }
      });
  }; 

  return (
    <Layout>  
      <h1>Edit Product</h1>  

      <form onSubmit={handleSubmit}>  
        <input
          type="text"  // Input for product name
          name="name"
          value={product.name}  // Set value to the product name from state
          onChange={handleChange}  // Call handleChange when input value changes (agar state diperbarui setiap kali pengguna mengetik)
          required  // Make this field required
        />
        <input
          type="number"  // Input for product price
          name="price"
          value={product.price}  // Set value to the product price from state
          onChange={handleChange}  // Call handleChange when input value changes (agar state diperbarui setiap kali pengguna mengetik)
          required  // Make this field required
        />
        <textarea
          name="description"
          value={product.description}  // Set value to the product description from state
          onChange={handleChange}  // Call handleChange when input value changes (agar state diperbarui setiap kali pengguna mengetik)
          required  // Make this field required
        ></textarea>
        <button type="submit">Update</button>
      </form>
    </Layout>
  );
};

export default EditProduct;
