' use strict';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  initialCards
} from './initialCards.js';
import validationObj from '../utils/validationObj.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  popups,
  popupOpenEdit,
  popupOpenAdd,
  opupEdit,
  popupAdd,
  popupZoom,
  popupZoomImage,
  popupZoomCaption,
  popupZoomClose,
  profileForm,
  formAdd,
  userName,
  userJob,
  nameInput,
  jobInput,
  titleInput,
  urlInput,
  cardsContainer
} from '../utils/constants';


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
