import logo from '../images/Vector.svg';
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLogged, currentPage, onLogOut, handleLoginClick, handleRegistrationClick, email }) {
    return (
        <header className="header">
            <img className="header__logo" alt="Место" src={logo} />
            <div className='header__action-wrapper'>
                {isLogged ? <div className='header__action-logged'>
                    <div className='header__action-email'> {email}</div>
                    <Link onClick={onLogOut} to="/sign-in" className="header__action-text">Выйти</Link>
                </div> : <div>
                    {currentPage === '/sign-up'
                        ? <Link onClick={handleLoginClick} to="/" className="header__action-text">Войти</Link>
                        : <Link onClick={handleRegistrationClick} to="/sign-up" className="header__action-text">Регистрация</Link>}
                </div>}
            </div>
        </header>
    )
}

export default Header;