' use strict';

// импорт классов
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

// импорт css
import './index.css';

// создание класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43/',
  headers: {
    authorization: 'bf94a4a3-f1eb-4d81-b643-f108c2d4cabd',
    'Content-Type': 'application/json'
  },
});

//Общий запрос на добавление данных пользователя и карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, userCard]) => {
    handleUserInfo(userInfo);
    cardsContainer.rendered(userCard);
  }).catch((err) => {
    console.log(`Упс..Ошибка ${err}`);
  });

// получаем данные пользователя
const handleUserInfo = (data) => {
  userData.setUserInfo(data);
  userData.setUserAvatar(data);
  userData.id = data._id;
};

// создаем экземпляр класса UserInfo
const userData = new UserInfo({
  name: '.profile__name',
  about: '.profile__job',
  avatar: '.profile__avatar'
});


// Создаем экземпляр карточки
const renderCard = (data) => {
  const card = new Card(data, '.card', userData.id, handleCardClick, handleDeleteIconClick, handleLikeClick, api);
  const cardElement = card.generateCard();
  return cardElement;
};

// Добавляем карточку в разметку
const cardsContainer = new Section(renderCard, '.elements__list');

// функция увеличение картинки при клике
const handleCardClick = (name, link) => {
  popupZoomImg.open(name, link);
};

// попап увелечения картинки при клике
const popupZoomImg = new PopupWithImage({
  popupSelector: '.popup_zoom',
  imageUrl: '.popup__zoom-image',
  imageName: '.popup__caption'
});

// функия удаления карточки
const handleDeleteIconClick = (card) => {
  popupDeleteCard.open();
  popupDeleteCard.setAction(() => {
    api
      .deleteCard(card.getIdCard())
      .then(() => {
        card.handleDeleteCard();
        popupDeleteCard.close();
      }).catch((res) => {
        console.log(res);
      });
  });
};

// экземпляр попапа с удалением
const popupDeleteCard = new PopupWithConfirm('.popup_confirm-delete');

// функция для постановки и снятия лайка
const handleLikeClick = (card) => {
  card.handleLikeCard();
};

// меняем текст на кнопке, пока выполняется запрос
const renderLoading = ((popup, isLoading = false) => {
  const currentStatusBtn = document.querySelector(`${popup} .popup__submit`);

  if (isLoading) {
    currentStatusBtn.textContent = 'Сохранение...';
  } else {
      currentStatusBtn.textContent = 'Сохранить';
  }
});

// валидируем формы
const formValidateProfile = new FormValidator(validationObj, profileForm);
formValidateProfile.enableValidation();

const formVAlidateAdd = new FormValidator(validationObj, formAdd);
formVAlidateAdd.enableValidation();

const formVAlidateAvatar = new FormValidator(validationObj, formAvatar);
formVAlidateAvatar.enableValidation();

// Popups
// добавление карточки
const popupAddCard = new PopupWithForm('.popup_add', (data) => {
  renderLoading('.popup_add', true);
  api
    .addCard(data)
    .then((res) => {
      cardsContainer.addItem(renderCard(res));
      popupAddCard.close();
    }).catch((err) => {
      console.log(`Не удалось добавить карточку. Ошибка :${err}`);
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
    }).catch((err) => {
      console.log(`Не удалось обновить данные. Ошибка :${err}`);
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
      alert(`Не удалось загрузить аватар. Ошибка :${err}`);
    })
    .finally(() => {
      renderLoading('.popup_add-avatar', false);
    });
});


// слушатели
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
