import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'              // 👈 REMOVE /components/
import './index.css'  // 👈 This line MUST be there                 // 👈 REMOVE /components/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)