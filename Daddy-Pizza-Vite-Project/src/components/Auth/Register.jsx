import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const PasswordErrorMessage = () => (
    <p className="FieldError">Пароль должен содержать минимум 8 символов</p>
);

const ConfirmPasswordErrorMessage = () => (
    <p className="FieldError">Пароли не совпадают</p>
);

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState({ value: '', isTouched: false });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', isTouched: false });
    const [address, setAddress] = useState('');
    const [registerStatus, setRegisterStatus] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password.value !== confirmPassword.value) {
            setRegisterStatus('Пароли не совпадают');
            return;
        }
    
        const user = {
            email: email,
            password: password.value,
            idRole: 1,
            adress: address, 
            createDate: new Date().toISOString() 
        };
    
        try {
            const response = await fetch('http://localhost:5002/api/Users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                // Сохранение токена и id пользователя при успешной регистрации
                localStorage.setItem('token', 'your_token_here');
                localStorage.setItem('userId', 'user_id_here');
                setRegisterStatus('Аккаунт успешно зарегистрирован');
                navigate('/home');
            } else {
                const errorText = await response.text();    
                setRegisterStatus(`Ошибка при регистрации: ${errorText}`);
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            setRegisterStatus(`Ошибка при регистрации: ${error}`);
        }        
    };
    
    const getIsFormValid = () => {
        return (
            email &&
            password.value.length >= 8 &&
            password.value === confirmPassword.value &&
            address
        );
    };

    return (
        <div className="App">
            <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                <fieldset>
                    <h2 className="register-title">Регистрация</h2>
                    <div className="Field">
                        <label>Электронная почта <sup>*</sup></label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Электронная почта"
                            className="register-input"
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
                            className="register-input"
                        />
                        {password.isTouched && password.value.length < 8 && <PasswordErrorMessage />}
                    </div>
                    <div className="Field">
                        <label>Подтвердите пароль <sup>*</sup></label>
                        <input
                            type="password"
                            value={confirmPassword.value}
                            onChange={e => setConfirmPassword({ ...confirmPassword, value: e.target.value })}
                            onBlur={() => setConfirmPassword({ ...confirmPassword, isTouched: true })}
                            placeholder="Подтвердите пароль"
                            className="register-input"
                        />
                        {confirmPassword.isTouched && confirmPassword.value !== password.value && <ConfirmPasswordErrorMessage />}
                    </div>
                    <div className="Field">
                        <label>Адрес <sup>*</sup></label>
                        <input
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder="Адрес"
                            className="register-input"
                        />
                    </div>
                    <button type="submit" disabled={!getIsFormValid()} className="register-button">Зарегистрироваться</button>
                    {registerStatus && <p className="register-status">{registerStatus}</p>}
                </fieldset>
            </form>
        </div>
    );
}

export default Register;
