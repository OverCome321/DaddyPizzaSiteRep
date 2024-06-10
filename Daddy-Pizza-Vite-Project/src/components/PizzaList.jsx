import React, { useEffect, useState } from 'react';
import './PizzaList.css'; // Поправьте путь к CSS файлу
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function PizzaList() {
    const [pizzas, setPizzas] = useState([]);
    const [ingredients, setIngredients] = useState([]); 
    const [error, setError] = useState(null);
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [openModal, setOpenModal] = useState(false); 
    const [modalError, setModalError] = useState(null); 
    const [userId, setUserId] = useState(localStorage.getItem('userId')); // Добавляем состояние для userId
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5002/api/pizzas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched pizzas:', data);
                setPizzas(data);
            })
            .catch(error => {
                console.error('Error fetching pizzas:', error);
                setError('Failed to fetch pizzas. Please try again later.');
            });
    }, []);

    const handleOpenIngredients = async (id) => {
        console.log(`Selected Pizza ID: ${id}`);
        try {
            const response = await fetch(`http://localhost:5002/api/PizzasToppings/toppings-for-pizza/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch ingredients for pizza');
            }
            const data = await response.json();
            console.log(`Toppings for Pizza ID ${id}:`, data); 
            const ingredientsDetails = await Promise.all(
                data.map(async (item) => {
                    const ingredientResponse = await fetch(`http://localhost:5002/api/Toppings/${item.IdTopping}`);
                    if (!ingredientResponse.ok) {
                        throw new Error(`Failed to fetch ingredient details for topping id ${item.IdTopping}`);
                    }
                    return ingredientResponse.json();
                })
            );
            setSelectedPizza(id);
            setIngredients(ingredientsDetails);
            setOpenModal(true);
            setModalError(null);
        } catch (error) {
            setModalError('Failed to find ingredients.');
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddToBasket = async (id) => {
        const basketItem = {
            idBasket: parseInt(userId, 10),
            idPizza: id,
            count: 1 
        };
    
        try {
            const response = await fetch('http://localhost:5002/api/BacketPizzas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(basketItem)
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Failed to add pizza to basket:', errorMessage);
                setModalError(`Failed to add pizza to basket: ${errorMessage}`);
                setOpenModal(true);
            } else {
                console.log('Pizza added to basket');
                setSnackbarMessage('Пицца успешно добавлена в корзину');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error adding pizza to basket:', error);
            setModalError(`Failed to add pizza to basket: ${error.message}`);
            setOpenModal(true);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <div className="pizza-list-container">
            <h1 className="pizza-list-title">Каталог пицц</h1>
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <ul className="pizza-list">
                    {pizzas.map(pizza => (
                        <li key={pizza.id} className="pizza-item">
                            <div className="pizza-info">
                                <button className="info-button" onClick={() => handleOpenIngredients(pizza.id)}>
                                    <span role="img" aria-label="question">❓</span>
                                </button>
                                <div>
                                    <span className="pizza-name">{pizza.name}</span>
                                    <span className="pizza-price">${pizza.price.toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="add-button" onClick={() => handleAddToBasket(pizza.id)}>+</button>
</li>
))}
</ul>
)}
{selectedPizza && ingredients.length > 0 && (
<Modal
                 open={openModal}
                 onClose={handleCloseModal}
                 aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description"
             >
<Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, maxHeight: 600, overflow: 'auto' }}>
<h2 id="modal-modal-title">Ингредиенты для пиццы {selectedPizza}</h2>
<ul>
{ingredients.map((ingredient, index) => (
<li key={index}>{ingredient.name}</li>
))}
</ul>
</Box>
</Modal>
)}
{modalError && (
<Modal
                 open={openModal}
                 onClose={handleCloseModal}
                 aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description"
             >
<Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, maxHeight: 600, overflow: 'auto' }}>
<h2 id="modal-modal-title">Error</h2>
<p>{modalError}</p>
</Box>
</Modal>
)}
<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
<MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
{snackbarMessage}
</MuiAlert>
</Snackbar>
</div>
);
}

export default PizzaList;
