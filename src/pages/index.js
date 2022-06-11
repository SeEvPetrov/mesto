' use strict';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import validationObj from '../utils/validationObj.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
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
  formAvatar,
  nameInput,
  jobInput,
} from '../utils/constants.js';

import './index.css';

const formValidateProfile = new FormValidator(validationObj, profileForm);
const formVAlidateAdd = new FormValidator(validationObj, formAdd);
const formVAlidateAvatar = new FormValidator(validationObj, formAvatar);

// валидируем формы
formValidateProfile.enableValidation();
formVAlidateAdd.enableValidation();
formVAlidateAvatar.enableValidation();

// взаимодейтсвуем с сервером
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43/',
  headers: {
    authorization: 'bf94a4a3-f1eb-4d81-b643-f108c2d4cabd',
    'Content-Type': 'application/json'
  },
});

const renderLoading = ((popup, isLoading = false) => {
  const currentStatusBtn = document.querySelector(`${popup} .popup__submit`);

  if(isLoading) {
    currentStatusBtn.textContent = 'Сохранение...';
  } else {
    currentStatusBtn.textContent = 'Сохраненить';
  }
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

const handleDeleteIconClick = (card) => {
  popupDeleteCard.open();
  popupDeleteCard.getIdCard(card);
};

const handleLikeClick = (card, like) => {
  const cardLike = like ? api.deleteLike(card._id) : api.setLike(card._id);
    cardLike
      .then(() => {
        card.putLike(like);
        console.log(card._id);
      }).catch((err) => {
        console.log(`Неудачная попытка поставить лайк. ${err}`);
      });
};

const popupDeleteCard = new PopupWithConfirm('.popup_confirm-delete', (cardId) => {
  api
    .deleteCard(cardId)
    .then(()=> {
      popupDeleteCard._card.handleDeleteCard();
      popupDeleteCard.close();
    }).catch((res) => {
      console.log(res);
    });
});


// Добавление карточки на страницу
const renderCard = (data) => {
  const card = new Card(data, '.card', userData.id, handleCardClick, handleDeleteIconClick, handleLikeClick);
  const cardElement = card.generateCard();
  console.log(data);
  return cardElement;
};

// Popups
// Добавление карточки в верстку
const popupAddCard = new PopupWithForm('.popup_add', (data) => {
  renderLoading('.popup_add', true);
  api
    .addCard(data)
    .then((res) => {
      cardsContainer.addItem(renderCard(res));
      popupAddCard.close();
    }).catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading('.popup_add', false);
    });

});

// Редактирование карточки профиля
const popupProfile = new PopupWithForm('.popup_edit', (data) => {
  renderLoading('.popup_edit', true);
  api
    .setUserInfo(data)
    .then((res) => {
      userData.setUserInfo(res);
      popupProfile.close();
    }).catch((res) => {
      console.log('false');
    })
    .finally(() => {
      renderLoading('.popup_edit', false);
    });
});

// функционал изменения аватара
const popupAvatar = new PopupWithForm('.popup_add-avatar', (data) => {
  renderLoading('.popup_add-avatar', true);
  userData.setUserAvatar(data);
  api
  .loadAvatar(data.link)
  .then(() => {
    popupAvatar.close();
  }).catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading('.popup_add-avatar', false);
  });
});

// попап увелечения картинки при клике
const popupZoomImg = new PopupWithImage({
  popupSelector: '.popup_zoom',
  imageUrl: '.popup__zoom-image',
  imageName: '.popup__caption'
});

const cardsContainer = new Section(renderCard, '.elements__list');


Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, userCard]) => {
  handleUserInfo(userInfo);
  cardsContainer.rendered(userCard);
}).catch((err) => {
  console.log(`Упс..Ошибка ${err}`);
});



popupDeleteCard.setEventListeners();
popupZoomImg.setEventListeners();
popupAddCard.setEventListeners();
popupProfile.setEventListeners();
popupAvatar.setEventListeners();

popupOpenEditAvatar.addEventListener("click", () => {
  popupAvatar.open();
  formVAlidateAvatar.resetValidation();
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
