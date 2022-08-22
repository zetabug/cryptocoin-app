import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import CoinPage from './pages/CoinPage.js';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} exact/>
          <Route path="/coins/:id" element={<CoinPage/>} exact/>
        </Routes>
    </BrowserRouter>
  );
}