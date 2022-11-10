import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        onLogin({ email, password }).then(() => {
            navigate('/');
        })
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <div className="login">
            <h2 className="login__welcome">Вход</h2>
            <input id="email" className="login__input" value={email} onChange={handleEmailChange} name="email" type="email" placeholder="Email" />
            <input id="password" className="login__input" value={password} onChange={handlePasswordChange} name="password" type="password" placeholder="Пароль" />
            <button type="submit" onClick={handleLogin} className="login__button">Войти</button>
        </div>
    )
}

export default Login;