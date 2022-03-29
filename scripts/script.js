' use strict ';

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popup = document.querySelectorAll(".popup"),
  popupOpenEdit = document.querySelector(".profile__edit-button"),
  popupOpenAdd = document.querySelector(".profile__add-button"),
  popupEdit = document.querySelector(".popup_edit"),
  popupAdd = document.querySelector(".popup_add"),
  popupCloseEdit = popupEdit.querySelector(".popup__button-close"),
  popupCloseAdd = popupAdd.querySelector(".popup__button-close"),
  popupZoom = document.querySelector(".popup_zoom"),
  popupZoomImage = document.querySelector(".popup__zoom-image"),
  popupZoomCaption = document.querySelector(".popup__caption"),
  popupZoomClose = popupZoom.querySelector(".popup__button-close"),
  profileForm = document.querySelector(".form-edit"),
  formAdd = document.querySelector(".form-add"),
  userName = document.querySelector(".profile__name"),
  userJob = document.querySelector(".profile__job"),
  nameInput = document.querySelector(".popup__input_type_name"),
  jobInput = document.querySelector(".popup__input_type_job"),
  titleInput = document.querySelector(".popup__input_type_title"),
  urlInput = document.querySelector(".popup__input_type_url"),
  cardsContainer = document.querySelector('.elements__list');

// функция которая будет заполнять input данными со страницы
function setDataInput() {
  nameInput.value = userName.textContent; //в input модального окна заносим данные со страницы
  jobInput.value = userJob.textContent;

  openPopup(popupEdit);
}

// создаем функцию открытия модального окна
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', makeCloseEsc);
}

// функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', makeCloseEsc);
}

// закрытие модального окна по кнопке ESC
const  makeCloseEsc = (evt) => {
  const openPopup = document.querySelector('.popup_opened');
  if (evt.code === 'Escape') {
    closePopup(openPopup);
  }
};

const makeCloseOverlay = (popup) => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target === popup && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
});
};

// навесим закрытие попапа кликом на оверлей на каждый попап
const setEventCloseOverlay = (popupList) => {
  popupList.forEach((popup) => {
    makeCloseOverlay(popup);
  });
};

// отменим стандартное поведение формы, получаем данные из input
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value; //записываем введеные данные из инпут на страницу
  userJob.textContent = jobInput.value;

  closePopup(popupEdit);
}

//создание карточки
const createCard = (data) => {
  const cardTemplate = document.querySelector('.card').content;
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__item-img');
  const cardTitle = cardElement.querySelector('.elements__item-title');
  const likeBtn = cardElement.querySelector('.elements__item-like');
  const deleteBtn = cardElement.querySelector('.elements__item-delete');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  setImageClickHandler(cardImage);
  likeBtn.addEventListener('click', toggleLike);
  deleteBtn.addEventListener('click', deleteCard);


  return cardElement;
};

// Добавление карточки на страницу
const renderCard = (data, cardsContainer) => {
  // Создаем карточку на основе данных
  const cardElement = createCard(data);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
};

// ставим или убираем лайки
const toggleLike = (evt) => {
  evt.target.classList.toggle('elements__item-like_active');
};

// удаляем карточки
const deleteCard = (evt) => {
  evt.target.closest('.elements__item').remove();
};

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

// увеличение изображения при клике
const setImageClickHandler = (cardImage) => {
  cardImage.addEventListener('click', () => {

    popupZoomImage.src = cardImage.src;
    popupZoomImage.alt = cardImage.alt;
    popupZoomCaption.textContent = cardImage.alt;

    openPopup(popupZoom);
  });
};

//Добавление карточек на основе массива
const addCards = (arr) => {
  arr.forEach((card) => {
    renderCard({
      name: card.name,
      link: card.link
    }, cardsContainer);
  });
};

addCards(initialCards);

const inputResetError = () => {
  const erorList = document.querySelectorAll('.popup__input-error');
  const inputList = document.querySelectorAll('.popup__input');

  inputList.forEach((element) => {
    element.classList.remove('popup__input_type_error');
  });

  erorList.forEach((element) => {
    element.classList.remove('popup__input_type_error');
    element.textContent = '';
  });
};

// обработчик на кнопку открытия модального окна
popupOpenEdit.addEventListener("click", () => {
  setDataInput();
  inputResetError();
});
popupOpenAdd.addEventListener("click", () => openPopup(popupAdd));


// обработчик на кнопку закрытия модального окна
popupCloseEdit.addEventListener("click", () => closePopup(popupEdit));
popupCloseAdd.addEventListener("click", () => closePopup(popupAdd));
popupZoomClose.addEventListener("click", () => closePopup(popupZoom));



// вешаем обработчик на форму
profileForm.addEventListener("submit", handleProfileFormSubmit);

formAdd.addEventListener("submit", handleFormAddSubmit);


setEventCloseOverlay(popup);
// Валидация форм

// функция которая будет показывать ошибку в поле инпута
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// функция которая будет скрывать текст ошибки
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
};

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
      setEventListeners(formElement, rest);
});
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
