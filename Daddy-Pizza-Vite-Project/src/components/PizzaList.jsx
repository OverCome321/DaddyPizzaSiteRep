import React, { useEffect, useState } from 'react';

function PizzaList() {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5002/api/pizzas')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPizzas(data);
            })
            .catch(error => console.error('Error fetching pizzas:', error));
    }, []);
    

    return (
        <div>
            <h1>Pizza List</h1>
            <ul>
                {pizzas.map(pizza => (
                    <li key={pizza.id}>{pizza.name} - ${pizza.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default PizzaList;
