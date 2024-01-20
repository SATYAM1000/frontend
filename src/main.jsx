import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
     <App />
    <Toaster />
  </AppProvider>
  
)
