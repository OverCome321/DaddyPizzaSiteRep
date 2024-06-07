import react from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const goToPizzaList = () => {
        navigate('/PizzaList');
    };
    const goToComboList = () => {
        navigate('/ComboList');
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to Our Pizza Store</h1>
            <button onClick={goToPizzaList} className="navigate-button">Go to Pizza List</button>
            <button onClick={goToComboList} className="navigate-button">Go to Combo List</button>
        </div>
    );
}

export default Home;