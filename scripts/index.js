'use strict';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  initialCards
} from './initialCards.js';

const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const popups = document.querySelectorAll(".popup");
const popupOpenEdit = document.querySelector(".profile__edit-button");
const popupOpenAdd = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupZoom = document.querySelector(".popup_zoom");
const popupZoomImage = document.querySelector(".popup__zoom-image");
const popupZoomCaption = document.querySelector(".popup__caption");
const popupZoomClose = popupZoom.querySelector(".popup__button-close");
const profileForm = document.querySelector(".form-edit");
const formAdd = document.querySelector(".form-add");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const titleInput = document.querySelector(".popup__input_type_title");
const urlInput = document.querySelector(".popup__input_type_url");
const cardsContainer = document.querySelector('.elements__list');

const formValidateProfile = new FormValidator(validationObj, profileForm);
const formVAlidateAdd = new FormValidator(validationObj, formAdd);


// функция которая будет заполнять input данными со страницы
function setDataInput() {
  nameInput.value = userName.textContent; //в input модального окна заносим данные со страницы
  jobInput.value = userJob.textContent;

  openPopup(popupEdit);
}

// создаем функцию открытия модального окна
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', handleEscUp);
}

// функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleEscUp);
}

// закрытие модального окна по кнопке ESC
const handleEscUp = (evt) => {

  if (evt.key === 'Escape') {
    const activePop = document.querySelector('.popup_opened');
    closePopup(activePop);
  }
};

// навешиваем слушателя на попал для возможности закрытия моадльного кликом на оверлей
const handleOverlay = (popup) => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target === popup && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
};

// навесим закрытие попапа кликом на оверлей на каждый попап
const setEventCloseOverlay = (popupList) => {
  popupList.forEach((popup) => {
    handleOverlay(popup);
  });
};

export function handleCardClick(name, link) {
  popupZoomImage.src = this._link;
  popupZoomImage.alt = this._name;
  popupZoomCaption.textContent = this._name;

  openPopup(popupZoom);
}

// отменим стандартное поведение формы, получаем данные из input
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value; //записываем введеные данные из инпут на страницу
  userJob.textContent = jobInput.value;

  closePopup(popupEdit);
}

// слушатель форму добавления карточки
function handleFormAddSubmit(evt) {
  evt.preventDefault();

  const card = {
    name: titleInput.value,
    link: urlInput.value
  };

  renderCard(card, cardsContainer);
  evt.target.reset();
  closePopup(popupAdd);
}

// Добавление карточки на страницу
function renderCard(dataCard, cardsContainer) {
  cardsContainer.prepend(createCard(dataCard));
}

function createCard(dataCard) {
  const card = new Card(dataCard, '.card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//Добавление карточек на основе массива
function addCards(arrayCards) {
  arrayCards.forEach((card) => {
    renderCard(card, cardsContainer);
  });
}

// очищаем формы
const resetForm = (form) => {
  form.reset();
};

formValidateProfile.enableValidation();
formVAlidateAdd.enableValidation();

addCards(initialCards);
setEventCloseOverlay(popups);

// обработчик на кнопку открытия модального окна
popupOpenEdit.addEventListener("click", () => {
  setDataInput();
  formValidateProfile.resetValidation();
});

popupOpenAdd.addEventListener("click", () => {
  openPopup(popupAdd);
  formVAlidateAdd.resetValidation();
  resetForm(formAdd);
});

// Закрытие попапов по крестику
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});

popupZoomClose.addEventListener("click", () => closePopup(popupZoom));

// вешаем обработчик на форму
profileForm.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleFormAddSubmit);
