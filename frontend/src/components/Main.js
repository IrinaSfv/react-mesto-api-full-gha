import React from "react";
import { useEffect, useState, useContext } from 'react';
import profileAvatar from '../images/Profile_Avatar.jpg';
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

    //Подписываемся на контекст текущего пользователя
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content page__content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <button className="profile__avatar-edit-button" type="button" aria-label="Кнопка редактирования аватара пользователя" onClick={onEditAvatar}></button>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                </div>
                <div className="profile__avatar-info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="Кнопка редактирования профиля пользователя" onClick={onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Кнопка добавления новой карточки места" onClick={onAddPlace}></button>
            </section>
            <section className="elements" aria-label="Элементы">
                <ul className="elements__list">
                    {cards.map(item => {
                        return (
                            <Card card={item} key={item._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                        )
                    }
                    )}
                </ul>
            </section>
        </main>
    );
}

export default Main;