import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`http://localhost:85/api/Users/login?email=${email}&password=${password}`);
            const isAuthenticated = await response.json();
            if (isAuthenticated) {
                // Вход выполнен успешно
                setLoginStatus('User found');
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
        <div>
            <h2>Login</h2>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            {loginStatus && <p>{loginStatus}</p>}
        </div>
    );
}

export default Login;
