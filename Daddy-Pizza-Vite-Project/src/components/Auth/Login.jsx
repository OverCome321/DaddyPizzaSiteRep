import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const PasswordErrorMessage = () => (
    <p className="FieldError">Пароль должен содержать минимум 8 символов</p>
);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState({ value: '', isTouched: false });
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            navigate('/Home');
        }
    }, []);

    const handleLogin = async () => {
        if (!email || password.value.length < 8) {
            setLoginStatus('Вы не заполнили все поля или пароль меньше 8 символов');
            return;
        }
        try {
            const response = await fetch(`http://localhost:5002/api/Users/login?email=${email}&password=${password.value}`);
            const isAuthenticated = await response.json();
            if (isAuthenticated) {
                localStorage.setItem('token', 'your_token_here');
                localStorage.setItem('userId', 'user_id_here');
                setLoginStatus('Пользователь найден');
                navigate('/Home');
            } else {
                setLoginStatus('Неверный пароль или почта.');
            }
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
            setLoginStatus('Ошибка при авторизации');
        }
    };

    const isFormValid = () => email && password.value.length >= 8;

    return (
        <div className="App">
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <fieldset>
                    <h2 className="login-title">Вход</h2>
                    <div className="Field">
                        <label>Электронная почта <sup>*</sup></label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            placeholder="Электронная почта" 
                            className="login-input"
                        />
                    </div>
                    <div className="Field">
                        <label>Пароль <sup>*</sup></label>
                        <input 
                            type="password" 
                            value={password.value} 
                            onChange={e => setPassword({ ...password, value: e.target.value })}
                            onBlur={() => setPassword({ ...password, isTouched: true })}
                            placeholder="Пароль" 
                            className="login-input"
                        />
                        {password.isTouched && password.value.length < 8 && <PasswordErrorMessage />}
                    </div>
                    <button type="submit" className="login-button" disabled={!isFormValid()}>Войти</button>
                    <button type="button" onClick={() => navigate('/Register')} className="register-link">Нет аккаунта? Создайте его</button>
                    {loginStatus && <p className="login-status">{loginStatus}</p>}
                </fieldset>
            </form>
        </div>
    );
}

export default Login;
