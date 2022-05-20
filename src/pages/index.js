' use strict';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards
} from '../utils/initialCards.js';
import validationObj from '../utils/validationObj.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  popupOpenEdit,
  popupOpenAdd,
  profileForm,
  formAdd,
  nameInput,
  jobInput,
} from '../utils/constants.js';

import './index.css';

const formValidateProfile = new FormValidator(validationObj, profileForm);
const formVAlidateAdd = new FormValidator(validationObj, formAdd);

// валидируем формы
formValidateProfile.enableValidation();
formVAlidateAdd.enableValidation();

const popupZoomImg = new PopupWithImage({
  popupSelector: '.popup_zoom',
  imageurl: '.popup__zoom-image',
  imageName: '.popup__caption',
});

// функция увеличение картинки при клике
const handleCardClick = (name, link) => {
  popupZoomImg.open(name, link);
};

// Логика инициализации класса Card

// Добавление карточки на страницу
const renderCard = (data) => {
  const card = new Card(data, '.card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const createCard = new Section(
  {
  items: initialCards,
  renderer: renderCard
},
  '.elements__list'
);

// Добавим карточку на страницу
createCard.renderer();

const userData = new UserInfo({name: '.profile__name', job: '.profile__job'});

// Добавление карточки в верстку
const popupAddCard = new PopupWithForm('.popup_add', (data) => {
  createCard.addItem(renderCard(data));
});

// Редактирование карточки профиля
const popupProfile = new PopupWithForm('.popup_edit', (data) => {
  userData.setUserInfo(data);
});

popupZoomImg.setEventListeners();
popupAddCard.setEventListeners();
popupProfile.setEventListeners();


popupOpenEdit.addEventListener("click", () => {
  const getUserData = userData.getUserInfo();

  nameInput.value = getUserData.name;
  jobInput.value = getUserData.job;

  popupProfile.open();
  formValidateProfile.resetValidation();

});

popupOpenAdd.addEventListener("click", () => {
  formVAlidateAdd.resetValidation();
  popupAddCard.open();
});
