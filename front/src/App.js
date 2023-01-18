import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import CategoryPage from './pages/CategoryPage';
import ShopDetail from './pages/ShoptDetail';
import SearchPage from './pages/SearchPage';

import Header from './components/Header';

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/shop" element={<Header />}>
        <Route path="/shop/:categoryId" element={<CategoryPage />} />
        <Route path="/shop/detail/:id" element={<ShopDetail />} />
        <Route path="/shop/search" element={<SearchPage />}/>
      </Route>
      <Route path="/" element={<Navigate replace to="/shop/0" />} />
    </Routes>
  );
}

export default App;
