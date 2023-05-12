import React from "react";

function InfoTooltip({ isOpen, onClose, infoTitle, infoImg, onEscClick, onOverlayClick }) {
    return (
        <div className={`popup info-tooltip-popup ${isOpen && "popup_opened"}`} onKeyDown={onEscClick} onClick={onOverlayClick}>
            <div className={`popup__container info-tooltip-popup__container`}>
                <button className={`popup__close-button info-tooltip-popup__close-button`} type="button" aria-label="Кнопка закрытия данного попапа" onClick={onClose}></button>
                <img
                    className="info-tooltip-popup__image"
                    src={infoImg}
                    alt={infoTitle}
                />
                <h2 className={`popup__title info-tooltip-popup__title`}>
                    {infoTitle}
                </h2>
            </div>
        </div>
    );
}

export default InfoTooltip;