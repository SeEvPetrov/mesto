import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor({ popupSelector, imageUrl, imageName }) {
    super(popupSelector);
    this._imageUrl = document.querySelector(imageUrl);
    this._imageName = document.querySelector(imageName);
  }

  open(name, link) {
    this._imageUrl.src = link;
    this._imageUrl.alt = name;
    this._imageName.textContent = name;

    super.open();
  }
}
