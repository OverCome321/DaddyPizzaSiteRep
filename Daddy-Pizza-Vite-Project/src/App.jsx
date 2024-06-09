import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register';
import Home from './components/Home';
import PizzaList from './components/PizzaList';
import Combo from './components/Combo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pizzalist" element={<PizzaList />} />
        <Route path="/combolist" element={<Combo />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
