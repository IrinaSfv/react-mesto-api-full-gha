import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, submitTitle, onEscClick, onOverlayClick }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function changeName(e) {
        setName(e.target.value);
    }

    function changeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            type="edit-popup"
            name="editPopup"
            title="Редактировать профиль"
            submitTitle={submitTitle}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onEscClick={onEscClick}
            onOverlayClick={onOverlayClick}
        >
            <input onChange={changeName} className="popup__input popup__input_type_name" type="text" name="name" value={name || ""} placeholder="Имя" id="name-input" minLength="2" maxLength="40" required />
            <span id="name-input-error" className="popup__error"></span>
            <input onChange={changeDescription} className="popup__input popup__input_type_user-info" type="text" name="about" value={description || ""} placeholder="О себе" id="userInfo-input" minLength="2" maxLength="200" required />
            <span id="userInfo-input-error" className="popup__error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;