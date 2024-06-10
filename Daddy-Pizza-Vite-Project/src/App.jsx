import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import NavigationAppBar from './components/Utils/AppBar';
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register';
import PizzaList from './components/PizzaList';
import Basket from './components/Basket'; 
import OrdersPage from './components/OrdersPage'; 

const AppContent = () => {
    const location = useLocation();
    const showAppBar = location.pathname !== '/login' && location.pathname !== '/register';
    return (
        <>
            {showAppBar && <NavigationAppBar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pizzalist" element={<PizzaList />} />
                <Route path="/basket" element={<Basket />} /> 
                <Route path="/orders" element={<OrdersPage />} /> 
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
