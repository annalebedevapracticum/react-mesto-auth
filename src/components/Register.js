function Register() {
    return (
        <div>
              <div className="login">
            <h2 className="login__welcome">Регистрация</h2>
                <input id="email" className="login__input" name="email" type="email" placeholder="Email" />
                <input id="password" className="login__input" name="password" type="password" placeholder="Пароль" />
                <button type="submit" className="login__button">Зарегистрироваться</button>
                <button type="submit" className="login__entry">Уже зарегистрированы? Войти</button>
        </div>
        </div>
    )
}

export default Register;