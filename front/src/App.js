import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Test from './pages/Test.js';
import ShopDetail from './pages/ShoptDetail';

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/shop/detail/:id" element={<ShopDetail />} />
    </Routes>
  );
}

export default App;
