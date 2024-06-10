import React, { useEffect, useState } from 'react';
import './OrdersPage.css'; 
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function OrdersPage() { 
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [orderPizzas, setOrderPizzas] = useState([]);
    
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:5002/api/orders/user/${userId}`)
                .then(response => response.json())
                .then(data => setOrders(data))
                .catch(error => console.error('Error fetching orders:', error));
        }
    }, [userId]);

    useEffect(() => {
        if (selectedOrder) {
            fetch(`http://localhost:5002/api/orderpizzas/${selectedOrder}`)
                .then(response => response.json())
                .then(data => {
                    const pizzaIds = data.map(orderPizza => orderPizza.idPizza);
                    Promise.all(pizzaIds.map(id => fetch(`http://localhost:5002/api/pizzas/${id}`).then(response => response.json())))
                        .then(pizzas => setOrderPizzas(pizzas))
                        .catch(error => console.error('Error fetching pizza details:', error));
                })
                .catch(error => console.error('Error fetching order pizzas:', error));
        }
    }, [selectedOrder]);

    const handleOpenOrderDetails = (id) => {
        setSelectedOrder(id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await fetch(`http://localhost:5002/api/orderpizzas/${orderId}`, {
                method: 'DELETE'
            });

            await fetch(`http://localhost:5002/api/orders/${orderId}`, {
                method: 'DELETE'
            });

            setOrders(orders.filter(order => order.id !== orderId));
            setSelectedOrder(null);
            setOpenModal(false);
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

    return (
        <div className="orders-page-container">
            <h1 className="order-list-title">Список заказов</h1>
            {orders.length > 0 ? ( /* Проверяем, есть ли заказы в списке */
                <ul className="order-list">
                    {orders.map(order => (
                        <li key={order.id} className="order-item">
                            <div className="order-details">
                                <span className="order-id">Заказ #{order.id}</span>
                                <span className="order-date">Дата: {new Date(order.dateOrder).toLocaleDateString()}</span>
                                <span className="order-status">Статус: {order.status}</span>
                            </div>
                            <button className="info-button" onClick={() => handleOpenOrderDetails(order.id)}>
                                <span role="img" aria-label="question">❓</span>
                            </button>
                            {order.status === 'в работе' && (
                                <button className="cancel-button" onClick={() => handleCancelOrder(order.id)}>Отменить</button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Список заказов пуст</p>
            )}
            {selectedOrder && (
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, maxHeight: 600, overflow: 'auto' }}>
                        <h2 id="modal-modal-title">Детали заказа #{selectedOrder}</h2>
                        <ul>
                            {orderPizzas.map(pizza => (
                                <li key={pizza.id} className="order-pizza">
                                    <span>{pizza.name}</span>
                                    <span>{pizza.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                </li>
                            ))}
                        </ul>
                    </Box>
                </Modal>
            )}
        </div>
    );
}

export default OrdersPage;
