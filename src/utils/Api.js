import { request } from "./helpers";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._updateUrl = options.updateUrl;
  }

  getUserInfo() {
    return request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })

  }
  getCardsInfo() {
    return request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
  }

  updateProfileInfo(name, about) {
    return request(`${this._updateUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  addCard(name, link) {
    return request(`${this._updateUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  removeCard(cardId) {
    return request(`${this._updateUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  likeCard = (cardId) => {
    return request(`${this._updateUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  deleteCardLike = (cardId) => {
    return request(`${this._updateUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  changeLikeCardStatus = (cardId, isLiked) => {
    if (isLiked) {
      return this.deleteCardLike(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }

  updateAvatar = (avatar) => {
    return request(`${this._updateUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      })
    })
  }
}

export default Api;
//Если файл с маленькой буквы, не проходит проверку на автотестах

export const apiInstance = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-50',
  updateUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: 'b4e2c2b5-478c-44a2-8411-ea93c0b3b5ee',
    'Content-Type': 'application/json'
  }
});

