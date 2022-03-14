" use strict ";

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

const popupOpenEdit = document.querySelector(".profile__edit-button"),
  popupOpenAdd = document.querySelector(".profile__add-button"),
  popupEdit = document.querySelector(".popup_edit"),
  popupAdd = document.querySelector(".popup_add"),
  popupCloseEdit = popupEdit.querySelector(".popup__button-close"),
  popupCloseAdd = popupAdd.querySelector(".popup__button-close"),
  popupZoom = document.querySelector(".popup_zoom"),
  popupZoomImage = document.querySelector(".popup__zoom-image"),
  popupZoomCaption = document.querySelector(".popup__caption"),
  popupZoomClose = popupZoom.querySelector(".popup__button-close"),
  formElement = document.querySelector(".form-edit"),
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
}

// создаем функцию открытия модального окна
function openPopup(popup) {
  popup.classList.add("popup_opened");

  setDataInput();
}

// функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// отменим стандартное поведение формы, получаем данные из input
function formSubmitHandler(evt) {
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

  openPopupZoomImage(cardImage);
  likeBtn.addEventListener('click', toggleLike);
  deleteBtn.addEventListener('click', deleteCard);


  return cardElement;
};

const renderCard = (data, cardsContainer) => {
  // Создаем карточку на основе данных
  const cardElement = createCard(data);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
};

// ставим или убираем лайки
const toggleLike = (evt)  => {
  evt.target.classList.toggle('elements__item-like_active');
};

// удаляем карточки
const deleteCard = (evt) => {
  evt.target.closest('.elements__item').remove();
};

// слушатель форму добавления карточки
const formSubmitHandlerAdd = (evt) => {
  evt.preventDefault();

  renderCard ({
    name: titleInput.value,
    link: urlInput.value
  }, cardsContainer);

  titleInput.value = '';
  urlInput.value = '';

  closePopup(popupAdd);
};

// увеличение изображения при клике
const openPopupZoomImage = (cardImage) => {
  cardImage.addEventListener('click', () => {

    popupZoomImage.src = cardImage.src;
    popupZoomImage.alt = cardImage.alt;
    popupZoomCaption.textContent = cardImage.alt;

    openPopup(popupZoom);
  });
};

//Добавление карточек на основе массива
const addCard = (arr) => {
  arr.forEach((card) => {
    renderCard({
      name: card.name,
      link: card.link
    }, cardsContainer);
  });
};

addCard(initialCards);

// обработчик на кнопку открытия модального окна
popupOpenEdit.addEventListener("click", () => openPopup(popupEdit));
popupOpenAdd.addEventListener("click", () => openPopup(popupAdd));


// обработчик на кнопку закрытия модального окна
popupCloseEdit.addEventListener("click", () => closePopup(popupEdit));
popupCloseAdd.addEventListener("click", () => closePopup(popupAdd));
popupZoomClose.addEventListener("click", () => closePopup(popupZoom));


// вешаем обработчик на форму
formElement.addEventListener("submit", formSubmitHandler);
formAdd.addEventListener("submit", formSubmitHandlerAdd);
