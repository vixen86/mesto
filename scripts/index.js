const openEditPopupButton = document.querySelector(
  ".profile__info-edit-button"
);
const closeEditPopupButton = document.querySelector("#close-popup-button");
const editPopup = document.querySelector("#edit-popup");

const profileInfoName = document.querySelector(".profile__info-name");
const inputName = document.querySelector("#input-name");
const profileInfoAbout = document.querySelector(".profile__info-about");
const inputAbout = document.querySelector("#input-about");

const editForm = document.querySelector("#edit-popup-form");

const openAddPopupButton = document.querySelector(".profile__add-button");
const closeAddPopupButton = document.querySelector("#close-add-popup-button");
const addPopup = document.querySelector("#add-popup");
const editAddForm = document.querySelector("#add-popup-form");
const inputTitle = document.querySelector("#input-title");
const inputLink = document.querySelector("#input-link");

const cardTemplate = document.querySelector("#card-template");
const cardTemplateContent = cardTemplate.content;
const cardElement = cardTemplateContent.querySelector(".element");

const cardBlock = document.querySelector(".elements__items");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const openFigurePopup = document.querySelector("#figure-popup");
const closeFigurePopupButton = document.querySelector(
  "#close-figure-popup-button"
);

const popupList = document.querySelectorAll(".popup");


function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupClickEsc);
  document.addEventListener("click", closePopupClickOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupClickEsc);
  document.removeEventListener("click", closePopupClickOverlay);
}


initialCards.forEach(function (card) {
  const newCards = createNewCard(card);
  cardBlock.prepend(newCards);
});

function createNewCard(card) {
  const newCard = cardElement.cloneNode(true);
  const elementTitle = newCard.querySelector(".element__title");
  elementTitle.textContent = card.name;
  const elementImage = newCard.querySelector(".element__image");
  elementImage.alt = card.name;
  elementImage.src = card.link;

  const deleteButton = newCard.querySelector(".element__delete-button");
  deleteButton.addEventListener("click", function () {
    newCard.remove();
  });

  const likeButton = newCard.querySelector(".element__like-button");
  likeButton.addEventListener("click", function (event) {
    event.target.classList.toggle("element__like-button_active", true);
  });

  const openFigure = newCard.querySelector(".element__image");
  openFigure.addEventListener("click", function () {
    popupImage.src = elementImage.src;
    popupImage.alt = elementImage.alt;
    popupCaption.textContent = elementTitle.textContent;
    openPopup(openFigurePopup);
  });

  return newCard;
}


openEditPopupButton.addEventListener("click", function () {
  inputName.value = profileInfoName.textContent;
  inputAbout.value = profileInfoAbout.textContent;
  openPopup(editPopup);

  hideInputError(editPopup, inputName, classNames);
  hideInputError(editPopup, inputAbout, classNames);
});

closeEditPopupButton.addEventListener("click", function () {
  closePopup(editPopup);
});

editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileInfoName.textContent = inputName.value;
  profileInfoAbout.textContent = inputAbout.value;
  closePopup(editPopup);
});


openAddPopupButton.addEventListener("click", function () {
  editAddForm.reset();
  openPopup(addPopup);

  hideInputError(addPopup, inputTitle, classNames);
  hideInputError(addPopup, inputLink, classNames);

  const buttonElement = editAddForm.querySelector(".popup__button");
  disableSubmitButton(buttonElement, classNames);
});

closeAddPopupButton.addEventListener("click", function () {
  closePopup(addPopup);
});


closeFigurePopupButton.addEventListener("click", function () {
  closePopup(openFigurePopup);
});


editAddForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  const value = { name, link };
  const cards = createNewCard(value);
  cardBlock.prepend(cards);
  closePopup(addPopup);
});


function closePopupClickEsc(evt) {
  popupList.forEach(function (pop) {
    if (evt.key === "Escape") {
      closePopup(pop);
    }
  });
}

function closePopupClickOverlay(evt) {
  popupList.forEach(function (pop) {
    if (evt.target === pop) {
      closePopup(pop);
    }
  });
}


