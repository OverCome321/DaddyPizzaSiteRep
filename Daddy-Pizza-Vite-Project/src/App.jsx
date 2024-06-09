import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register';
import Home from './components/Home';
import PizzaList from './components/PizzaList';
import Combo from './components/Combo';

function App() {
<<<<<<< Updated upstream
    return (
      <Router>
        <div>
        <nav>
        <ul>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/PizzaList">PizzaList</Link></li>
            <li><Link to="/ComboList">ComboList</Link></li>
          </ul>
        </nav>
        
        <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/PizzaList" element={<PizzaList />} />
        <Route path="/ComboList" element={<Combo />} />

        </Routes>
        </div>
        </Router>
    );
=======
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
>>>>>>> Stashed changes
}

export default App;
