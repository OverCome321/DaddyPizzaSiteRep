import React, { useEffect, useState } from 'react';
import './PizzaList.css'; // Подключаем файл стилей

function Combo() {
    const [combos, setPizzas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5002/api/combos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setPizzas(data);
            })
            .catch(error => {
                console.error('Error fetching pizzas:', error);
                setError('Failed to fetch pizzas. Please try again later.');
            });
    }, []);

    return (
        <div className="pizza-list-container">
            <h1 className="pizza-list-title">Combo List</h1>
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <ul className="pizza-list">
                    {combos.map(combo => (
                        <li key={combo.id} className="pizza-item">
                            <span className="pizza-name">{combo.name}</span>
                            <span className="pizza-price">${combo.price.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Combo;
