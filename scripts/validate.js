const classNames = {
  formSelector: ".popup__form",
  inputSelector: ".popup__name-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__name-input_type_error",
  errorClass: "popup__input-error_active",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  classNames
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classNames.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classNames.errorClass);
};

const hideInputError = (formElement, inputElement, classNames) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classNames.inputErrorClass);
  errorElement.classList.remove(classNames.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, classNames) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      classNames
    );
  } else {
    hideInputError(formElement, inputElement, classNames);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, classNames) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(classNames.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(classNames.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement, classNames) => {
  const inputList = Array.from(
    formElement.querySelectorAll(classNames.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    classNames.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, classNames);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, classNames);
      toggleButtonState(inputList, buttonElement, classNames);
    });
  });
};

const enableValidation = (classNames) => {
  const formList = Array.from(
    document.querySelectorAll(classNames.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, classNames);
  });
};

enableValidation(classNames);
