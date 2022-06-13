" use strict";

export default class Api {
  constructor(options) {
    // тело конструктора
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  checkError(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
        headers: this._headers
      })
      .then(res => {
        return this.checkError(res);
      });
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(res => {
        return this.checkError(res);
      });
  }


  getInitialCards() {
    return fetch(`${this._url}cards`, {
        headers: this._headers
      })
      .then(res => {
        return this.checkError(res);
      });
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(res => {
        return this.checkError(res);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this.checkError(res);
    });
  }

  setLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this.checkError(res);
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this.checkError(res);
    });
  }

  loadAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      })
    }).then((res) => {
      return this.checkError(res);
    });
  }

}
