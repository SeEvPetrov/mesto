" use strict";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._deleteBtn = popupSelector.querySelector('.popup__submit');
    this._handleFormSubmit = handleFormSubmit;
  }

  
}
