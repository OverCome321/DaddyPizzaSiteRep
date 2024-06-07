// App.jsx
import React from 'react';
import Login from './components/Login'; 
import PizzaList from './components/PizzaList';
import Home from './components/Home';
import Combo from './components/Combo';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
    return (
      <Router>
        <div>
        <nav>
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/PizzaList">PizzaList</Link></li>
            <li><Link to="/ComboList">ComboList</Link></li>
          </ul>
        </nav>
        
        <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/PizzaList" element={<PizzaList />} />
        <Route path="/ComboList" element={<Combo />} />

        </Routes>
        </div>
        </Router>
    );
}

export default App;