import { StrictMode } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    <Toaster/>
    </BrowserRouter>
    
  </StrictMode>,
)
