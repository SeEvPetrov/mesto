'use strict';

const popupOpenBtn = document.querySelector(".profile__edit-button"),
  popupCloseBtn = document.querySelector(".popup__button-close"),
  popup = document.querySelector(".popup"),
  formElement = document.querySelector(".popup__form"),
  userName = document.querySelector(".profile__name"),
  userJob = document.querySelector(".profile__job"),
  nameInput = document.querySelector(".popup__input_type_name"),
  jobInput = document.querySelector(".popup__input_type_job");

  /* функция которая будет заполнять input данными со страницы */
function setDataInput () {
  nameInput.value = userName.textContent; //в input модального окна заносим данные со страницы
  jobInput.value = userJob.textContent;
}

/* создаем функцию открытия модального окна */
function openPopup() {
  popup.classList.add("popup_opened");
  
  setDataInput ();
}

/* функция закрытия модального окна */
function closePopup() {
  popup.classList.remove("popup_opened");
}

/* отменим стандартное поведение формы, получаем данные из input */
function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value; //записываем введеные данные из инпут на страницу
  userJob.textContent = jobInput.value;

  closePopup();
}

/* обработчик на кнопку открытия модального окна */
popupOpenBtn.addEventListener("click", openPopup);

/* обработчик на кнопку закрытия модального окна */
popupCloseBtn.addEventListener("click", closePopup);

/* вешаем обработчик на форму */
formElement.addEventListener("submit", formSubmitHandler);
