' use strict';

export default class Card {
  constructor({
    name,
    link,
    _id,
    owner,
    likes
  }, cardSelector, userId, handleCardClick, handleDeleteIconClick, handleLikeClick, api) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._userId = userId;
    this._owner = owner;
    this._likes = likes;
    this._likesLength = likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._btnLike = this._element.querySelector('.elements__item-like');
    this._quantityLikes = this._element.querySelector('.elements__quantity-like');

    const cardImage = this._element.querySelector('.elements__item-img');


    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._element.querySelector('.elements__item-title').textContent = this._name;
    this._element.querySelector('.elements__quantity-like').textContent = this._likes.length;

    // проверяем, если карточка не пользователя то убираем корзину
    if (this._owner._id !== this._userId) {
      this._element.querySelector('.elements__item-delete').remove();
    }

    if (this._likes.some((usersLike) => usersLike._id === this._userId)) {
      this._btnLike.classList.add('elements__item-like_active');
    }

    return this._element;
  }

  getIdCard() {
    return this._id;
  }

  handleLikeCard(isLike) {

    if (isLike) {
      this._btnLike.classList.remove('elements__item-like_active');
      this._quantityLikes.textContent = this._likesLength -= 1;

    } else {
      this._btnLike.classList.add('elements__item-like_active');
      this._quantityLikes.textContent = this._likesLength += 1;
    }
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners(evt) {
    this._element.querySelector('.elements__item-like').addEventListener('click', (evt) => {
      this._handleLikeClick(this, evt.target.classList.contains('elements__item-like_active'));
    });

    this._element.querySelector('.elements__item-delete').addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });

    this._element.querySelector('.elements__item-img').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
