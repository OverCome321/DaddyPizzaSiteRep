import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Basket from '../Basket';

const NavigationAppBar = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(localStorage.getItem('userId')); 
    const [openBasket, setOpenBasket] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleOpenBasket = () => {
        setOpenBasket(true);
    };

    const handleCloseBasket = () => {
        setOpenBasket(false);
    };

    const handleOrders = () => {
        navigate('/orders'); // Перенаправляем пользователя на страницу с заказами
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Button
                    color="inherit"
                    onClick={() => navigate('/pizzalist')}
                    sx={{ marginRight: 2, marginLeft: 2, fontSize: '1.2rem' }}
                >
                    Пиццы
                </Button>
                <div style={{ flexGrow: 1 }} />
                <Button
                    color="inherit"
                    onClick={handleOpenBasket}
                    sx={{ marginRight: 2, fontSize: '1.2rem' }}
                >
                    Корзина
                </Button>
                <Button
                    color="inherit"
                    onClick={handleOrders} // Добавляем обработчик для кнопки "Заказы"
                    sx={{ marginRight: 2, fontSize: '1.2rem' }}
                >
                    Заказы
                </Button>
                <Button
                    color="inherit"
                    onClick={handleLogout}
                    sx={{ fontSize: '1.2rem' }}
                >
                    Выйти из аккаунта
                </Button>
            </Toolbar>
            <Basket open={openBasket} handleClose={handleCloseBasket} userId={userId} />
        </AppBar>
    );
};

export default NavigationAppBar;
