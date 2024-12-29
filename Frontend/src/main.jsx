import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import './index.css';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <App />
    </AuthProvider>
    <ToastContainer/>
  </React.StrictMode>
);
