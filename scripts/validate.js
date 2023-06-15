// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__name-input');

// Выбираем элемент ошибки на основе уникального класса
const formError = formElement.querySelector(`.${formInput.id}-error`);



enableValidation({
  formSelector: '.popup__form',//создан
  inputSelector: '.popup__name-input',//создан
  submitButtonSelector: '.popup__button',//создан
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__name-input_type_error',//создан
  errorClass: 'popup__error_visible'
});

////////////////////



// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //Находим элемент в группе полей с классом содержащим идентификатор поля и суфикс -error (связанный с полем ввода span)
  inputElement.classList.add('popup__name-input_type_error');
  //  Для поля ввода с ошибкой добавляем класс popup__name-input_type_error в котором мы определяем его оформление в случае ошибки (например цвет границы)
  errorElement.textContent = errorMessage;
   // Устанавливаем текстовое содержимое связанного спана текстом ошибки из параметра errorMessage
  errorElement.classList.add('popup__input-error_active');
   // Для связанного спана добавляем класс в стилях которого определена его видимость (без него он скрыт)
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Находим элемент в группе полей с классом содержащим идентификатор поля и суфикс -error (связанный с полем ввода span)
  inputElement.classList.remove('popup__name-input_type_error');
  // Для поля ввода с ошибкой УДАЛЯЕМ класс popup__name-input_type_error в котором мы определяем его оформление в случае ошибки (например цвет границы). Без него оформление поле ввода будет как задано в классе элемента.
  errorElement.classList.remove('popup__input-error_active');
  // Для связанного спана Удаляем класс в стилях которого определена его видимость. Скрываем элемент.
  errorElement.textContent = '';
  // Обнуляем текстовое содержимое спана. Ошибки нет.
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Анализируем прошло ли проверку валидации значение содержащееся в поле ввода inputElement
    showInputError(formElement, inputElement, inputElement.validationMessage);
    // Если НЕТ, то вызывается функция showInputError. В функцию передаем значение сообщения об ошибке сгенерированного браузером (свойство validationMessage поля ввода inputElement)
  } else {
    hideInputError(formElement, inputElement);
    // Если ДА, то вызывается функция hideInputError
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid)
  //Используем для перебора значений массива полей ввода функцию some(). Для каждого поля из массива проверяем корректно ли его содержимое. Если хотя бы одно из полей неккоретно, то some вернет Истину. Иначе Ложь. Это же значение мы вернем из функции.
};

const toggleButtonState = (inputList, buttonElement) => {
if (hasInvalidInput(inputList)) {
  // Вызываем функцию hasInvalidInput с передачей в нее массива полей ввода группы полей. Анализируем возвращенное функцией значение
  buttonElement.classList.add('button_inactive');
  // Если функция hasInvalidInput вернула Истина, то есть есть некорректные поля, то добавлять класс который оформляет кнопку в состояние неактивной. Примечение: В проектной работе дополнительно нужно добавить атрибут disabled
} else {
  buttonElement.classList.remove('button_inactive');
  // Если функция hasInvalidInput вернула Ложь, то есть все поля заполнены корректно, то удалить класс который оформляет кнопку в состояние неактивной. Примечение: В проектной работе дополнительно нужно удалить атрибут disabled
}
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__name-input'));
  // Получаем коллекцию всех элементов группы полей с классом popup__name-input. Преобразуем его в массив(иначе нам будет недоступен метод some())
  const buttonElement = formElement.querySelector('.popup__submit');
  // Находим кнопку в группе полей с классом popup__submit.
  toggleButtonState(inputList, buttonElement);
  // Вызываем функцию toggleButtonState с передачей в нее массива найденных полей ввода и кнопки. Нужно для установки недоступного состояния кнопки при загрузке страницы.
  inputList.forEach((inputElement) => {
    // Обходим массив найденных полей ввода. Для каждого поля ввода (inputElement) выполняем код в фигурных скобках
    inputElement.addEventListener('input', function () {
      // Подключаем обработчик события input для поля ввода.
      checkInputValidity(formElement, inputElement);
      // Тут начинаю новую нумерацию, так как код будет выполнен только когда возникнет событие input. Вызывается функция checkInputValidity с передачей в нее группы полей и поля ввода на котором возникло событие input.
      toggleButtonState(inputList, buttonElement);
      // Вызываем функцию toggleButtonState.
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  // Получаем коллекцию всех элементов документа с классом form. Преобразуем его в массив
  formList.forEach((formElement) => {
    // Перебираем все найденные формы. Для каждой формы (formElement) выполняем блок кода в фигурных скобках.
    formElement.addEventListener('submit', function (evt) {
      // Для каждой формы (formElement) подключаем обработчик отправки данных формы. Примечание: В проектной работе у нас уже есть эти обработчики поэтому второй раз подключать не нужно.
      evt.preventDefault();
      // При отправке данных формы отключить стандартные действия браузера.
    });
  });
};

enableValidation();
