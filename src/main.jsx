import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import Login from "./Login.jsx"
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './layouts/utils/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
)
