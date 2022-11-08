function Login() {
    return (
        <div className="login">
            <h2 className="login__welcome">Вход</h2>
                <input id="email" className="login__input" name="email" type="email" placeholder="Email" />
                <input id="password" className="login__input" name="password" type="password" placeholder="Пароль" />
                <button type="submit" className="login__button">Войти</button>
        </div>
    )
}

export default Login;