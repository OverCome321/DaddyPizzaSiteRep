// App.jsx
import React from 'react';
import Login from './components/Login'; 
import PizzaList from './components/PizzaList';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
    return (
      <Router>
        <div>
        <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/PizzaList" element={<PizzaList />} />
        </Routes>
        </div>
        </Router>
    );
}

export default App;