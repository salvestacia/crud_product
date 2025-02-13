//Entry Point = bertugas merender App.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//Menggunakan createRoot untuk merender aplikasi ke dalam elemen dengan id="root"
//Memuat App.jsx, yang berisi routing utama aplikasi. App.jsx dipanggil di sini dan menjadi 
//komponen utama yang dikendalikan oleh React Router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)
