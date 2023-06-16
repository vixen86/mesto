const classNames = {
  formSelector: 'popup__form',
  inputSelector: 'popup__name-input',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__name-input_type_error',
  errorClass: 'popup__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${classNames.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${classNames.errorClass}`);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${classNames.inputErrorClass}`);
  errorElement.classList.remove(`${classNames.errorClass}`);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${classNames.inactiveButtonClass}`);
  } else {
    buttonElement.classList.remove(`${classNames.inactiveButtonClass}`);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`.${classNames.inputSelector}`)
  );
  const buttonElement = formElement.querySelector(`.${classNames.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formElement) => {
  const formList = Array.from(document.querySelectorAll(`.${classNames.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

