// " use strict";

import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteBtn = this._popupSelector.querySelector('.popup__submit');
  }

  setEventListeners() {
    super.setEventListeners();

    this._deleteBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._action();
      this.close();
    });
  }

  setAction(func) {
    this._action = func;
  }
}
