import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import CategoryPage from './pages/CategoryPage';
import ShopDetail from './pages/ShoptDetail';
import SearchPage from './pages/SearchPage';
import MyPage from './pages/MyPage';
import CartPage from './pages/CartPage';

import Header from './components/Header';
import InquiryTab from './components/InquiryTab';

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mypage/:id/:category" element={<MyPage />} />
      <Route path="/shop" element={<Header />}>
        <Route path="/shop/:categoryId" element={<CategoryPage />} />
        <Route path="/shop/detail/:id" element={<ShopDetail />} />
        <Route path="/shop/search" element={<SearchPage />}/>
      </Route>
      <Route path="/shop/inquiry" element={<InquiryTab />} />
      <Route path="/" element={<Navigate replace to="/shop/0" />} />
      <Route path="/cart/:id" element={<CartPage />} />
    </Routes>
  );
}

export default App;
