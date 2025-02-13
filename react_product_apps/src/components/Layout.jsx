//Layout Components = untuk tata telak dasar website

import React from "react";  // Import React library
import Sidebar from "./Sidebar";  // Import the Sidebar component to display it alongside the content

// Layout component to wrap and structure the page content with Sidebar and a main content area
const Layout = ({ children }) => {
  // Define inline styles for the content area
  const contentStyle = {
    marginLeft: "200px",  // Ensure content is shifted right to make space for the Sidebar (200px wide)
    padding: "20px",  // Add padding inside the content area for spacing
  };

  return (
    <div>
      {/* Sidebar is rendered first to remain fixed on the left side */}
      <Sidebar />

      {/* The main content area is rendered after the Sidebar, with the defined style */}
      <div style={contentStyle}>
        {/* Render any child components passed to the Layout component */}
        {/* Ini adalah tempat konten utama halaman akan ditampilkan */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
