' use strict';

export default class Card {
  constructor({name, link, _id, owner }, cardSelector, userId, handleCardClick, handleDeleteIconClick) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._userId = userId;
    this._owner = owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
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

    const cardImage = this._element.querySelector('.elements__item-img');

    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._element.querySelector('.elements__item-title').textContent = this._name;

    if(this._owner._id !== this._userId) {
      this._element.querySelector('.elements__item-delete').remove();
    }


    return this._element;
  }

  _toggleLike() {
    this._element.querySelector('.elements__item-like').classList.toggle('elements__item-like_active');
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__item-like').addEventListener('click', () => {
      this._toggleLike();
    });

    this._element.querySelector('.elements__item-delete').addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });

    this._element.querySelector('.elements__item-img').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }
}
