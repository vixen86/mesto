// Вынесем все необходимые элементы формы в константы
//const form = document.querySelector('.popup__form');
//const formInput = form.querySelector('.popup__name-input');

// Выбираем элемент ошибки на основе уникального класса
//const formError = form.querySelector(`.${formInput.id}-error`);


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__name-input_type_error');
  // Установите errorMessage в качестве значения textContent для formError
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add('popup__input-error_active');

};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__name-input_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove('popup__input-error_active');
  // Очищаем текстовое содержимое (свойство textContent) элемента formError, чтобы не хранить текст скрытой ошибки
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

/*form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

// Вызовем функцию checkInputValidity на каждый ввод символа
formInput.addEventListener('input', function () {
  checkInputValidity(form, formInput);
});*/

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__name-input'));
  inputList.forEach((inputElement) => {
   inputElement.addEventListener('input', function () {
     checkInputValidity(formElement, inputElement);
   });
 });
};

/*setEventListeners(form);*/

const enableValidation = (formElement) => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
    setEventListeners(formElement);
});
};

enableValidation();



/*function validateInputName(value){
  if (!value) {
    return 'Введите имя пользователя';
  }

  if (value.length < 5) {
    return 'Имя пользователя должно быть не меньше 5 символов';
  }

  return null;
};

function validateInputAbout{

};

function validateInputTitle{

};

function validateInputLink{

};



/*enableValidation({
  formSelector: '.popup__form',//создан
  inputSelector: '.popup__name-input',//создан
  submitButtonSelector: '.popup__button',//создан
  inactiveButtonClass: 'popup__button_disabled',//создан
  inputErrorClass: 'popup__name-input_type_error',//создан
  errorClass: 'popup__error_visible' //создан = popup__input-error_active
});*/










