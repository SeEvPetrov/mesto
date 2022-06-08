' use strict';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import validationObj from '../utils/validationObj.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// импорт переменных
import {
  popupOpenEdit,
  popupOpenAdd,
  popupOpenEditAvatar,
  profileForm,
  formAdd,
  nameInput,
  jobInput,
  avatarInput
} from '../utils/constants.js';

import './index.css';


const formValidateProfile = new FormValidator(validationObj, profileForm);
const formVAlidateAdd = new FormValidator(validationObj, formAdd);

// валидируем формы
formValidateProfile.enableValidation();
formVAlidateAdd.enableValidation();

// взаимодейтсвуем с сервером
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43/',
  headers: {
    authorization: 'bf94a4a3-f1eb-4d81-b643-f108c2d4cabd',
    'Content-Type': 'application/json'
  },
});

// Функция добавления данных пользователя
const handleUserInfo = (data) => {
  userData.setUserInfo(data);
  userData.setUserAvatar(data);
  userData.id = data._id;
};


const userData = new UserInfo({
  name: '.profile__name',
  about: '.profile__job',
  avatar: '.profile__avatar'
});





// функция увеличение картинки при клике
const handleCardClick = (name, link) => {
  popupZoomImg.open(name, link);
};

// Добавление карточки на страницу
const renderCard = (data) => {
  const card = new Card(data, '.card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

// Popups
// Добавление карточки в верстку
const popupAddCard = new PopupWithForm('.popup_add', (data) => {
  api
    .addCard(data)
    .then((res) => {
      cardsContainer.addItem(renderCard(res));
      popupAddCard.close();
    }).catch((err) => {
      console.log(err);
    });

});

// Редактирование карточки профиля
const popupProfile = new PopupWithForm('.popup_edit', (data) => {
  api
    .setUserInfo(data)
    .then((res) => {
      userData.setUserInfo(res);
      popupProfile.close();
    }).catch((res) => {
      console.log('false');
    });
});

// функционал изменения аватара
const popupAvatar = new PopupWithForm('.popup_add-avatar', (data) => {
  userData.setUserAvatar(data);
  api
  .loadAvatar(data.link)
  .then(() => {
    popupAvatar.close();
  }).catch((err) => {
    console.log(err);
  });

});

// попап увелечения картинки при клике
const popupZoomImg = new PopupWithImage({
  popupSelector: '.popup_zoom',
  imageUrl: '.popup__zoom-image',
  imageName: '.popup__caption'
});

const cardsContainer = new Section(renderCard, '.elements__list');

api.getUserInfo()
  .then((userInfo) => {
    handleUserInfo(userInfo);
  }).catch((err) => {
      console.log(err);
  });

api.getInitialCards()
  .then((userCard) => {
    cardsContainer.rendered(userCard);
  }).catch((err) => {
    console.log(err);
  });


popupZoomImg.setEventListeners();
popupAddCard.setEventListeners();
popupProfile.setEventListeners();
popupAvatar.setEventListeners();

popupOpenEditAvatar.addEventListener("click", () => {
  popupAvatar.open();
});


popupOpenEdit.addEventListener("click", () => {
  const getUserData = userData.getUserInfo();

  nameInput.value = getUserData.name;
  jobInput.value = getUserData.about;

  popupProfile.open();
  formValidateProfile.resetValidation();

});

popupOpenAdd.addEventListener("click", () => {
  formVAlidateAdd.resetValidation();
  popupAddCard.open();
});
