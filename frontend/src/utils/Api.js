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
    getUserData() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this.checkResponse);
    }

    // 2. Загрузка карточек
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this.checkResponse);
    }
  
    // 3. Редактирование профиля
    editProfile(userName, userAbout) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userName,
                about: userAbout,
            })
        })
        .then(this.checkResponse);
    } 

    // 4. Добавление новой карточки
    addNewCard(newName, newUrl) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: newName,
                link: newUrl,
            })
        })
        .then(this.checkResponse);
    }

    // 5. Удаление карточки
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.checkResponse);
    }

    // 6. Постановка лайка
    setLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this.checkResponse);
    }

    // 7. Снятие лайка
    removeLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.checkResponse);
    }

    // 8. Обновление аватара пользователя
    changeAvatar(avatarSrc) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarSrc,
            })
        })
        .then(this.checkResponse);
    }
}

const api = new Api({
    url: 'https://api.mesto.irinasfv.nomoredomains.monster',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
