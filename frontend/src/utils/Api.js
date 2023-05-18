class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }

    //Проверка ответа от сервера
    checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // 1. Загрузка информации о пользователе
    getUserData(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this.checkResponse);
    }

    // 2. Загрузка карточек
    getInitialCards(token) {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this.checkResponse);
    }
  
    // 3. Редактирование профиля
    editProfile(userName, userAbout, token) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userName,
                about: userAbout,
            })
        })
        .then(this.checkResponse);
    } 

    // 4. Добавление новой карточки
    addNewCard(newName, newUrl, token) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newName,
                link: newUrl,
            })
        })
        .then(this.checkResponse);
    }

    // 5. Удаление карточки
    deleteCard(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this.checkResponse);
    }

    // 6. Постановка лайка
    setLike(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this.checkResponse);
    }

    // 7. Снятие лайка
    removeLike(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this.checkResponse);
    }

    // 8. Обновление аватара пользователя
    changeAvatar(avatarSrc, token) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: avatarSrc,
            })
        })
        .then(this.checkResponse);
    }
}

const api = new Api({
    url: 'https://api.mesto.irinasfv.nomoredomains.monster',
});

export default api;
