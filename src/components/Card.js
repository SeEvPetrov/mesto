' use strict';

export default class Card {
  constructor({name, link, _id }, cardSelector, handleCardClick, handleDeleteIconClick) {
    this._name = name;
    this._link = link;
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

    return this._element;
  }

  _toggleLike() {
    this._element.querySelector('.elements__item-like').classList.toggle('elements__item-like_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__item-like').addEventListener('click', () => {
      this._toggleLike();
    });

    this._element.querySelector('.elements__item-delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.elements__item-img').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }
}
