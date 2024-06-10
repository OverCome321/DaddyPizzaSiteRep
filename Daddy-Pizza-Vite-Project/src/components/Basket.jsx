import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button'; // Импорт компонента Button
import './Basket.css'; // Импорт файла стилей

function Basket({ open, handleClose, userId, email, password, address }) {
    const [basketItems, setBasketItems] = useState([]);
    const [pizzas, setPizzas] = useState([]);
    const [error, setError] = useState(null);
    const basketId = localStorage.getItem('userId');

    useEffect(() => {
        if (open) {
            fetchBasketItems();
        } else {
            setError(null);
        }
    }, [open]);

    const fetchBasketItems = async () => {
        try {
            const response = await fetch(`http://localhost:5002/api/BacketPizzas/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch basket items');
            }
            const data = await response.json();
            setBasketItems(data);
            fetchPizzaDetails(data);
        } catch (error) {
            console.error('Error fetching basket items:', error);
            setError('Failed to fetch basket items. Please try again later.');
        }
    };

    const fetchPizzaDetails = async (basketItems) => {
        try {
            const pizzasData = await Promise.all(
                basketItems.map(async (item) => {
                    const response = await fetch(`http://localhost:5002/api/Pizzas/${item.idPizza}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch pizza details');
                    }
                    const data = await response.json();
                    return data;
                })
            );
            setPizzas(pizzasData);
        } catch (error) {
            console.error('Error fetching pizza details:', error);
            setError('Failed to fetch pizza details. Please try again later.');
        }
    };

    const handleDeleteItem = async (idPizza) => {
        try {
            const response = await fetch(`http://localhost:5002/api/BacketPizzas/${basketId}/${idPizza}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete basket item');
            }
            // После успешного удаления обновляем данные корзины
            await fetchBasketItems(); // Обновляем данные корзины
            // Удаляем удаленную пиццу из массива pizzas
            setPizzas(prevPizzas => prevPizzas.filter(pizza => pizza.id !== idPizza));
        } catch (error) {
            console.error('Error deleting basket item:', error);
            setError('Failed to delete basket item. Please try again later.');
        }
    };

    const handleCreateOrder = async () => {
        try {
            if (basketItems.length === 0) {
                setError('Упс, корзина пуста!');
                return;
            }
    
            const order = {
                dateOrder: new Date().toISOString(),
                status: 'в работе',
                idUser: basketId,
            };
    
            const responseOrder = await fetch(`http://localhost:5002/api/Orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
    
            if (!responseOrder.ok) {
                const errorText = await responseOrder.text();
                throw new Error(`Failed to create order: ${responseOrder.status} ${errorText}`);
            }
    
            const createdOrder = await responseOrder.json();
    
            for (const basketItem of basketItems) {
                const orderPizza = {
                    idPizza: basketItem.idPizza,
                    idOrder: createdOrder.id,
                    count: basketItem.count 
                };
    
                const responseOrderPizza = await fetch(`http://localhost:5002/api/OrderPizzas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderPizza)
                });
    
                if (!responseOrderPizza.ok) {
                    const errorText = await responseOrderPizza.text();
                    throw new Error(`Failed to add pizza to order: ${responseOrderPizza.status} ${errorText}`);
                }
            }
    
            await fetch(`http://localhost:5002/api/BacketPizzas/${basketId}`, {
                method: 'DELETE'
            });
            setBasketItems([]);
            setPizzas([]);
            handleClose();
        } catch (error) {
            console.error('Error creating order:', error);
            setError(`Failed to create order. Please try again later. ${error.message}`);
        }
    };
    

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="basket-container"> {/* Использование стилей */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 id="modal-modal-title">Корзина</h2>
                    <IconButton onClick={handleClose} className="close-button"> {/* Использование стилей */}
                        <CloseIcon className="close-icon" />
                    </IconButton>
                </div>
                <ul>
                    {pizzas.map((pizza, index) => (
                        <li key={index} className="basket-item"> {/* Использование стилей */}
                            <span className="basket-item-name">{pizza.name} (Количество: {basketItems[index].count})</span>
                            <button onClick={() => handleDeleteItem(pizza.id)} className="delete-button"> {/* Использование стилей */}
                                <CloseIcon className="delete-icon" /> {/* Использование стилей */}
                            </button>
                        </li>
                    ))}
                </ul>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {/* Кнопка "Создать заказ" */}
                <Button variant="contained" color="success" onClick={handleCreateOrder}>
                    Создать заказ  
                    </Button>
            </Box>
        </Modal>
    );
}

export default Basket;
