import logo from '../images/Vector.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" alt="Место" src={logo} />
        </header>
    )
}

export default Header;