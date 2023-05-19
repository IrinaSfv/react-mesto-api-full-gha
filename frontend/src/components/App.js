import React from "react";
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import api from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ConfirmPopup from "./ConfirmPopup";
import * as auth from "../utils/Auth";
import SuccessImgSrc from "../images/Info_Success.svg";
import FailImgSrc from "../images/Info_Fail.svg";

function App() {
  // хук навигации
  const navigate = useNavigate();
  // состояние авторизации пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  // email для отображения в хедере
  const [userEmail, setUserEmail] = useState("");
  // состояние отображения попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  // массив карточек для отображения на странице
  const [cards, setCards] = useState([]);
  // выбранная карточка на данный момент
  const [selectedCard, setSelectedCard] = useState(null);
  // карточка, которую нужно удалить 
  const [deletedCard, setDeletedCard] = useState(null);
  // текущий пользователь
  const [currentUser, setCurrentUser] = useState({});
  // тексты на сабмит-кнопках попапов
  const [editSubmitTitle, setEditSubmitTitle] = useState("Сохранить");
  const [avatarSubmitTitle, setAvatarSubmitTitle] = useState("Обновить");
  const [addSubmitTitle, setAddSubmitTitle] = useState("Добавить");
  // текст и картинка для отображения в инфо-попапе при входе и регистрации
  const [infoTitle, setInfoTitle] = useState("");
  const [infoImg, setInfoImg] = useState(null);
  // токен текущего пользователя
  const [currentToken, setCurrentToken] = useState(localStorage.getItem('token'));

  // проверка токена каждый раз, когда пользователь открывает страницу
  useEffect(() => {
    checkToken();
  }, []);

  // загрузка карточек и профиля пользователя
  useEffect(() => {
    if (loggedIn && currentToken) {
      Promise.all([api.getUserData(currentToken), api.getInitialCards(currentToken)])
        .then(([resUser, resCards]) => {
          setCurrentUser(resUser);
          setCards(resCards.reverse());
        })
        .catch(() => {
          console.log(`Ошибка при загрузке данных пользователя и карточек.`);
        });
    }
  }, [loggedIn, currentToken]);

  // регистрация пользователя в системе
  function handleRegistration(email, password) {
    auth.registerUser(email, password)
      .then((res) => {
        if (res) {
          setInfoTitle("Вы успешно зарегестрировались!");
          setInfoImg(SuccessImgSrc);
          navigate('/sign-in', { replace: true });
        }
      })
      .catch(() => {
        setInfoTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoImg(FailImgSrc);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
      });
  }

  // авторизация пользователя
  function handleLogin(email, password) {
    auth.loginUser(email, password)
      .then((data) => {
        if (data.token) {
          setUserEmail(email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(() => {
        setInfoTitle("Не получилось войти! Попробуйте ещё раз.");
        setInfoImg(FailImgSrc);
        setIsInfoPopupOpen(true);
        console.log(`Ошибка при входе в систему`);
      });
  }

  // выход пользователя из системы
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    setCurrentToken('');
    navigate('/sign-in', { replace: true });
  }

  // проверка токена
  function checkToken() {
    if (currentToken) {
      auth.getContent(currentToken).then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate("/", { replace: true });
        }
      })
        .catch(() => {
          console.log(`Ошибка при проверке токена`);
        });
    }
  }

  // функции для открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard(null);
  }

  // выбор текущей карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // постановка или удаление лайка с карточки
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API
    if (isLiked) { //если лайк на карточке уже есть
      api.removeLike(card._id, currentToken)
        .then((res) => { //получаем обновленный объект карточки
          setCards((state) =>
            state.map((c) => c._id === card._id ? res : c)
          );
        })
        .catch(() => {
          console.log(`Ошибка при удалении лайка.`)
        });
    } else { //если лайка на карточке нет
      api.setLike(card._id, currentToken)
        .then((res) => { //получаем обновленный объект карточки
          setCards((state) =>
            state.map((c) => c._id === card._id ? res : c)
          );
        })
        .catch(() => {
          console.log(`Ошибка при постановке лайка.`)
        });
    }
  }

  // удаление карточки
  function handleCardDelete() {
    api.deleteCard(deletedCard._id, currentToken)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c !== deletedCard)
        );
        closeAllPopups();
        console.log(`Карточка удалена.`)
      })
      .catch(() => {
        console.log(`Ошибка при удалении карточки.`)
      });
  }

  // обновление информации в профиле пользователя
  function handleUpdateUser(userData) {
    setEditSubmitTitle("Сохраняем...");
    const name = userData.name;
    const about = userData.about;
    api.editProfile(name, about, currentToken)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(() => {
        console.log(`Ошибка при обновлении данных.`)
      })
      .finally(() => {
        setEditSubmitTitle("Сохранить")
      });
  }

  // обновление аватара
  function handleUpdateAvatar(avatarData) {
    setAvatarSubmitTitle("Обновляем...");
    api.changeAvatar(avatarData.avatar, currentToken)
      .then((res) => { //получаем новый объект пользователя 
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(() => {
        console.log(`Ошибка при обновлении аватара.`)
      })
      .finally(() => {
        setAvatarSubmitTitle("Обновить")
      })
  }

  // добавление новой карточки
  function handleAddPlaceSubmit(cardData) {
    setAddSubmitTitle("Добавляем...");
    const place = cardData.place;
    const pictureSrc = cardData.pictureSrc;
    api.addNewCard(place, pictureSrc, currentToken)
      .then((newCard) => { //получаем объект новой карточки
        setCards([newCard, ...cards]);
        closeAllPopups();
        console.log(`Карточка добавлена.`)
      })
      .catch(() => {
        console.log(`Ошибка при добавлении карточки.`)
      })
      .finally(() => {
        setAddSubmitTitle("Добавить")
      })
  }

  // закрытие попапа при нажатии на Escape
  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  // закрытие попапа при клике на оверлей
  function handleOverlay(e) {
    if (!e.target.closest('.popup__container')) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header onSignOut={handleLogout} userEmail={userEmail} />
        <Routes>
          <Route path="/" element={<ProtectedRoute
            loggedIn={loggedIn}
            element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />
          } />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegistration} />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          submitTitle={editSubmitTitle}
          onEscClick={handleEscClose}
          onOverlayClick={handleOverlay}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          submitTitle={addSubmitTitle}
          onEscClick={handleEscClose}
          onOverlayClick={handleOverlay}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          submitTitle={avatarSubmitTitle}
          onEscClick={handleEscClose}
          onOverlayClick={handleOverlay}
        />
        <ImagePopup
          type="picture-popup"
          card={selectedCard}
          onClose={closeAllPopups}
          onEscClick={handleEscClose}
          onOverlayClick={handleOverlay}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          onEscClick={handleEscClose}
          onOverlayClick={handleOverlay}
        />
        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          infoTitle={infoTitle}
          infoImg={infoImg}
          onEscClick={handleEscClose}
          onOverlayClick={handleOverlay}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
