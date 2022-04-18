'use strict';

import { popupZoom, popupZoomImage, popupZoomCaption } from './index.js';

export default class Card {
  constructor (data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
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

  _toggleLike () {
    this._element.querySelector('.elements__item-like').classList.toggle('elements__item-like_active');
  }

  _handleDeleteCard () {
    this._element.remove();
    this._element = null;
  }

  _setImageClickHandler () {

    popupZoomImage.src = this._link;
    popupZoomImage.alt = this._name;
    popupZoomCaption.textContent = this._name;

    openPopup(popupZoom);
  }

  _setEventListeners () {
    this._element.querySelector('.elements__item-like').addEventListener('click', () => {
      this._toggleLike();
    });

    this._element.querySelector('.elements__item-delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.elements__item-img').addEventListener('click', () => {
      this._setImageClickHandler();
    });
  }
}
