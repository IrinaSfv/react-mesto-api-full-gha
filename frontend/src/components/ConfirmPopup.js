import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onConfirm, onEscClick, onOverlayClick }) {

    function handleSubmit(e) {
        e.preventDefault();
        onConfirm();
    }

    return (
        <PopupWithForm
            type="deletion-confirm-popup"
            name="deletionPopup"
            title="Вы уверены?"
            submitTitle="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onEscClick={onEscClick}
            onOverlayClick={onOverlayClick}
        />
    );
}

export default ConfirmPopup;