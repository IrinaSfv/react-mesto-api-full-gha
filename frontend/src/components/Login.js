import React from "react";
import AuthForm from "./AuthForm";
import { useState } from 'react';

function Login({ onLogin }) {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(emailValue, passwordValue);
        setEmailValue("");
        setPasswordValue("");
    }

    function changeEmail(e) {
        setEmailValue(e.target.value);
    }

    function changePassword(e) {
        setPasswordValue(e.target.value);
    }

    return (
        <AuthForm
            type="login"
            title="Вход"
        >
            <form className="auth__form" onSubmit={handleSubmit}>
                <input onChange={changeEmail} className="auth__input auth__input_type_email" type="email" value={emailValue || ""} name="email" placeholder="Email" minLength="2" maxLength="30" required />
                <input onChange={changePassword} className="auth__input auth__input_type_password" type="password" value={passwordValue || ""} name="password" placeholder="Пароль" minLength="6" maxLength="30" required />
                <button type="submit" className="auth__button">Войти</button>
            </form>
        </AuthForm>
    );
}

export default Login;