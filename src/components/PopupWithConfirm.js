// " use strict";

import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._deleteBtn = this._popupSelector.querySelector('.popup__submit');
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._deleteBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._id);
      this.close();
    });
  }

  getIdCard(card) {
    this._id = card._id;
    this._card = card;
  }

}
