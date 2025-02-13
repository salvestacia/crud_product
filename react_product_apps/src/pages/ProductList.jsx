//Halaman Daftar Produk = show list data produk dan to do CRUD of product data

import React, { useEffect, useState } from "react";  // Import React and necessary hooks for side effects and state management
import { useNavigate } from "react-router-dom";  // Import useNavigate for page navigation
import Layout from "../components/Layout";  // Import Layout component for consistent page structure
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  // Ambil URL dari .env

const ProductList = () => {
  const [products, setProducts] = useState([]);  // State to hold the list of products
  const [loading, setLoading] = useState(true);  // State to manage loading status
  const navigate = useNavigate();  // Hook to navigate between pages

  // useEffect hook to fetch products data from API when the component mounts
  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)  // Fetch the products data
      .then((response) => response.json())  // Parse the response to JSON
      .then((data) => {
        setProducts(data.data);  // Update state with the fetched product data
        setLoading(false);  // Set loading state to false once data is loaded
      })
      .catch(() => setLoading(false));  // Handle error and stop loading
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Function to handle product deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {  // Confirm before deletion
      fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",  // Set HTTP method to DELETE
      }).then(() =>
        setProducts(products.filter((product) => product.id !== id))  // Remove the deleted product from the state
      );
    }
  };

  return (
    <Layout>  
      <h1>Data Product</h1>  

      <button
        onClick={() => navigate("/products/create")}  // Navigate to the create product page
        className="add-button"  // Apply styling for the button
      >
        + Add Product
      </button>

      {/* Show loading message while fetching data */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        // Table to display products once data is loaded
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>  {/* Actions column for Edit and Delete */}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>Rp.{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    {/* Button to navigate to edit page for each product */}
                    <button
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    {/* Button to delete a product */}
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CSS styles within the component for table and button styling */}
      <style>
        {`
          .add-button {
            padding: 10px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 10px;
            width: 100%;
            max-width: 200px;
          }

          .loading {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
          }

          .table-container {
            overflow-x: auto;
          }

          .product-table {
            width: 100%;
            border-collapse: collapse;
          }

          .product-table th, .product-table td {
            padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
          }

          .product-table th {
            background-color: gray;
            color: white;
          }

          .edit-button, .delete-button {
            padding: 5px 10px;
            margin: 5px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
          }

          .edit-button {
            background-color: #FFC107;
          }

          .delete-button {
            background-color: #DC3545;
            color: white;
          }

          /* Responsiveness */
          @media (max-width: 768px) {
            .add-button {
              width: 100%;
            }

            .table-container {
              overflow-x: auto;
            }

            .product-table th, .product-table td {
              padding: 8px;
            }
          }

          @media (max-width: 480px) {
            .product-table {
              font-size: 12px;
            }

            .edit-button, .delete-button {
              font-size: 12px;
              padding: 3px 5px;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default ProductList;
