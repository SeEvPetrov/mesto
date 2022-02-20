    " use strict ";

    window.addEventListener('DOMContentLoaded', () => {


        const popupOpenBtn = document.querySelector('[data-popup]'),
            popupCloseBtn = document.querySelector('[data-close]'),
            popupEdit = document.querySelector('.popup_edit'),
            root = document.querySelector('.root'),
            formElement = document.querySelector('.popup__form'),
            userName = document.querySelector('.profile__name'),
            userJob = document.querySelector('.profile__job'),
            nameInput = document.querySelector('.popup__input_type_name'),
            jobInput = document.querySelector('.popup__input_type_job');



        /* создаем функцию открытия модального окна */
        function openPopup(popup) {
            popup.classList.add('popup_opened');
            root.classList.add('root_hidden'); //убирем прокрутку фона, когда открыто модальное окно
        }

        /* функция закрытия модального окна */
        function closePopup(popup) {
            popup.classList.remove('popup_opened');
            root.classList.remove('root_hidden');
        }

        /* обработчик на кнопку закрытия модального окна */
        popupCloseBtn.addEventListener('click', () => closePopup(popupEdit));


        /* закрываем попап с любого клика вокруг модального окна */
        popupEdit.addEventListener('click', (e) => {
            if (e.target === popupEdit) {
                closePopup(popupEdit);
            }
        });

        /* отменим стандартное поведение формы, получаем данные из input */
        function submitHandler(evt) {
            evt.preventDefault();

            userName.textContent = nameInput.value; //записываем введеные данные из инпут на страницу
            userJob.textContent = jobInput.value;

            closePopup(popupEdit);
        }

        /* вешаем обработчик на форму */
        formElement.addEventListener('submit', submitHandler);

        /* обработчик открытия модального окна */
        popupOpenBtn.addEventListener('click', () => {
            nameInput.value = userName.textContent; //в input модального окна заносим данные со страницы
            jobInput.value = userJob.textContent;

            openPopup(popupEdit);
        });


    });
