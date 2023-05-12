import React from "react";

function ImagePopup({type, card, onClose, onEscClick, onOverlayClick}) {
    return (
        <div onKeyDown={onEscClick} onClick={onOverlayClick} className={`popup ${type} ${card && "popup_opened"}`}>
            <div className={`popup__container ${type}__container`}>
                <button className={`popup__close-button ${type}__close-button`} type="button" aria-label="Кнопка закрытия данного попапа" onClick={onClose}></button>
                <figure className="picture-popup__figure">
                    <img className="picture-popup__image" src={`${card && card.link}`} alt={`${card && card.name}`} />
                    <figcaption className="picture-popup__caption">{`${card && card.name}`}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;