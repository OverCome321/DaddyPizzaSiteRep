import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Подключаем файл стилей

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`http://localhost:5002/api/Users/login?email=${email}&password=${password}`);
            const isAuthenticated = await response.json();
            if (isAuthenticated) {
                // Вход выполнен успешно
                setLoginStatus('User found');
                navigate('/Home');
            } else {
                // Ошибка входа, логин и/или пароль неверные
                setLoginStatus('Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginStatus('Error logging in');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <div className="login-form">
                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email" 
                    className="login-input"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password" 
                    className="login-input"
                />
                <button onClick={handleLogin} className="login-button">Login</button>
            </div>
            {loginStatus && <p className="login-status">{loginStatus}</p>}
        </div>
    );
}

export default Login;
