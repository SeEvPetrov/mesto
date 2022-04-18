'use strict';

import Card  from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';

const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const popup = document.querySelectorAll(".popup");
const popupOpenEdit = document.querySelector(".profile__edit-button");
const popupOpenAdd = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupCloseEdit = popupEdit.querySelector(".popup__button-close");
const popupCloseAdd = popupAdd.querySelector(".popup__button-close");
export const popupZoom = document.querySelector(".popup_zoom");
export const popupZoomImage = document.querySelector(".popup__zoom-image");
export const popupZoomCaption = document.querySelector(".popup__caption");
const  popupZoomClose = popupZoom.querySelector(".popup__button-close");
const  profileForm = document.querySelector(".form-edit");
const formAdd = document.querySelector(".form-add");
const  userName = document.querySelector(".profile__name");
const  userJob = document.querySelector(".profile__job");
const nameInput = document.querySelector(".popup__input_type_name");
const  jobInput = document.querySelector(".popup__input_type_job");
const  titleInput = document.querySelector(".popup__input_type_title");
const  urlInput = document.querySelector(".popup__input_type_url");
const  cardsContainer = document.querySelector('.elements__list');

const formValidateProfile = new FormValidator(validationObj, profileForm);
const formVAlidateAdd = new FormValidator(validationObj, formAdd);

// Добавление карточки на страницу
const renderCard = (data, cardsContainer) => {
  // Создаем карточку на основе данных
  const card = new Card(data, '.card');

  const cardElement = card.generateCard();
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
};

//Добавление карточек на основе массива
const addCards = (arrayCards) => {
  arrayCards.forEach((card) => {
    renderCard(card, cardsContainer);
  });
};
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

// отменим стандартное поведение формы, получаем данные из input
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value; //записываем введеные данные из инпут на страницу
  userJob.textContent = jobInput.value;

  closePopup(popupEdit);
}

// слушатель форму добавления карточки
const handleFormAddSubmit = (evt) => {
  evt.preventDefault();

  renderCard({
    name: titleInput.value,
    link: urlInput.value
  }, cardsContainer);

  evt.target.reset();

  closePopup(popupAdd);
};

const inputResetError = (form) => {
  const erorList = form.querySelectorAll('.popup__input-error');
  const inputList = form.querySelectorAll('.popup__input');

  inputList.forEach((element) => {
    element.classList.remove('popup__input_type_error');
  });

  erorList.forEach((element) => {
    element.classList.remove('popup__input_type_error');
    element.textContent = '';
  });
};

// очищаем формы
const resetForm = (form) => {
    form.reset();
};

formValidateProfile.enableValidation();
formVAlidateAdd.enableValidation();

addCards(initialCards);
setEventCloseOverlay(popup);

// обработчик на кнопку открытия модального окна
popupOpenEdit.addEventListener("click", () => {
  setDataInput();
  inputResetError(profileForm);
});

popupOpenAdd.addEventListener("click", () => {
  openPopup(popupAdd);
  inputResetError(formAdd);
  resetForm(formAdd);
});

// обработчик на кнопку закрытия модального окна
popupCloseEdit.addEventListener("click", () => {
  closePopup(popupEdit);
  resetForm(profileForm);
});

popupCloseAdd.addEventListener("click", () => {
  closePopup(popupAdd);
  resetForm(formAdd);
});

popupZoomClose.addEventListener("click", () => closePopup(popupZoom));

// вешаем обработчик на форму
profileForm.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleFormAddSubmit);
