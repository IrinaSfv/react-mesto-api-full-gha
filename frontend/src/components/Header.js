import React from "react";
import headerLogo from '../images/Header_Logo.svg';
import { Link, Route, Routes } from "react-router-dom";

function Header({ onSignOut, userEmail }) {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={headerLogo} alt="Логотип" />
        <Routes>
          <Route path='/sign-up' element={<Link to="/sign-in" className="header__link">Войти</Link>} />
          <Route path='/sign-in' element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
          <Route path='/' element={(
            <div className="header__info">
              <p className="header__email">{userEmail}</p>
              <Link to="/sign-in" className="header__exit" onClick={onSignOut}>
                Выйти
              </Link>
            </div>
          )} />
        </Routes>
      </div>
    </header>
  );
}

export default Header;