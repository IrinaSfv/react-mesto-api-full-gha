import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace, submitTitle, onEscClick, onOverlayClick }) {
    const [place, setPlace] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        setPlace("");
        setLink("");
    }, [isOpen]);

    function changePlace(e) {
        setPlace(e.target.value);
    }

    function changeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            place: place,
            pictureSrc: link,
        });
    }

    return (
        <PopupWithForm
            type="add-popup"
            name="addPopup"
            title="Новое место"
            submitTitle={submitTitle}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onEscClick={onEscClick}
            onOverlayClick={onOverlayClick}
        >
            <input onChange={changePlace} className="popup__input popup__input_type_place" type="text" name="place" value={place || ""} placeholder="Название" id="place-input" minLength="2" maxLength="30" required />
            <span id="place-input-error" className="popup__error"></span>
            <input onChange={changeLink} className="popup__input popup__input_type_link" type="url" name="pictureSrc" value={link || ""} placeholder="Ссылка на картинку" id="link-input" required />
            <span id="link-input-error" className="popup__error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;