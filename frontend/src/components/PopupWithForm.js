import React from "react";

function PopupWithForm({ type, isOpen, onClose, title, name, children, submitTitle, onSubmit, onEscClick, onOverlayClick }) {

    return (
        <div onKeyDown={onEscClick} onClick={onOverlayClick} className={`popup ${type} ${isOpen && "popup_opened"}`}>
            <div className={`popup__container ${type}__container`}>
                <button className={`popup__close-button ${type}__close-button`} type="button" aria-label="Кнопка закрытия данного попапа" onClick={onClose}></button>
                <h2 className={`popup__title ${type}__title`}>{title}</h2>
                <form onSubmit={onSubmit} className={`popup__form ${type}__form`} name={name}>
                    {children}
                    <button type="submit" className={`popup__submit-button popup__button ${type}__submit-button`}>{submitTitle}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;