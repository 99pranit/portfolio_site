import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // your global styles / tailwind import

createRoot(document.getElementById('root')).render(<App />);