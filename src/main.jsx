import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/authContext.jsx'
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
    <App />
    <Toaster position="top-right" reverseOrder={false} />

  </AuthContext>
  </BrowserRouter>
)
