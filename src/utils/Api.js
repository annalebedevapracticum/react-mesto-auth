import { request } from "./helpers";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._updateUrl = options.updateUrl;
    this._authHeaders = options.authHeaders;
    this._authUrl = options.authUrl;
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
  register({ email, password }) {
    return request(`${this._authUrl}/signup`, {
      method: 'POST',
      headers: this._authHeaders,
      body: JSON.stringify({
        email,
        password
      })
    })
  }

  authorize({ email, password }) {
    return request(`${this._authUrl}/signin`, {
      method: 'POST',
      headers: this._authHeaders,
      body: JSON.stringify({
        email,
        password
      })
    })
  }

  checkMe(token) {
    return request(`${this._authUrl}/users/me`, {
      method: 'GET',
      headers: { 
        ...this._authHeaders, 
        "Authorization": `Bearer ${token}` 
      }
    })
  }

}

export default Api;
//Если файл с маленькой буквы, не проходит проверку на автотестах

export const apiInstance = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-50',
  updateUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  authUrl: 'https://auth.nomoreparties.co',
  authHeaders: {
    'Content-Type': 'application/json',
  },
  headers: {
    authorization: 'b4e2c2b5-478c-44a2-8411-ea93c0b3b5ee',
    'Content-Type': 'application/json'
  }
});

