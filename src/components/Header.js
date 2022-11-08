import logo from '../images/Vector.svg';
import React from 'react';

function Header({ isLogged, isRegistration, handleLogOut,handleLoginClick, handleRegistrationClick }) {
    const mail = 'ggy@bh.hy';
    return (
        <header className="header">
            <img className="header__logo" alt="Место" src={logo} />
            <div className='header__action-wrapper'>
                {isLogged ? <div className='header__action-logged'>
                    <div className='header__action-email'> {mail}</div> 
                    <button onClick={handleLogOut} className="header__action-text">Выйти</button>
                </div> : <div>
                    {isRegistration
                        ? <button onClick={handleLoginClick} className="header__action-text">Войти</button>
                        : <button onClick={handleRegistrationClick} className="header__action-text">Регистрация</button>}
                </div>}
            </div>
        </header>
    )
}

export default Header;