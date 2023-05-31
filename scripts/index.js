let openPopupButton = document.querySelector(".profile__info-edit-button");
let closePopupButton = document.querySelector("#close-popup-button");
let editPopup = document.querySelector("#edit-popup");

let profileInfoName = document.querySelector(".profile__info-name");
let inputName = document.querySelector("#input-name");
let profileInfoAbout = document.querySelector(".profile__info-about");
let inputAbout = document.querySelector("#input-about");

let editForm = document.querySelector("#edit-popup-form");

function openPopup(popup) {
  inputName.value = profileInfoName.textContent;
  inputAbout.value = profileInfoAbout.textContent;
  popup.classList.add("popup_opened");
}

openPopupButton.addEventListener("click", function () {
  openPopup(editPopup);
});

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closePopupButton.addEventListener("click", function () {
  closePopup(editPopup);
});

editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileInfoName.textContent = inputName.value;
  profileInfoAbout.textContent = inputAbout.value;
  closePopup(editPopup);
});



let addPopupButton = document.querySelector(".profile__add-button");
let closeAddPopupButton = document.querySelector("#close-add-popup-button");
let addPopup = document.querySelector("#add-popup");
let editAddForm = document.querySelector("#add-popup-form");
let inputTitle = document.querySelector("#input-title");
let inputLink = document.querySelector("#input-link");

function openAddPopup(popup) {
  popup.classList.add("popup_opened");
  inputTitle.value = "";
  inputLink.value = "";
}

addPopupButton.addEventListener("click", function () {
  openAddPopup(addPopup);
});

closeAddPopupButton.addEventListener("click", function () {
  closePopup(addPopup);
});



const cardTemplate = document.querySelector("#card-template");
const cardTemplateContent = cardTemplate.content;
const cardElement = cardTemplateContent.querySelector(".element");
const cardElements = document.querySelector(".elements__items");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach(function (card) {
  const newCards = createNewCard(card);
  cardElements.prepend(newCards); /* новый элемент добавляем в начало */
});

function createNewCard(card) {
  const newCard = cardElement.cloneNode(true); /* true - глубокое клонирование*/
  const elementTitle = newCard.querySelector(".element__title");
  elementTitle.textContent = card.name;
  const elementImage = newCard.querySelector(".element__image");
  elementImage.alt = card.name;
  elementImage.src = card.link;

  const deleteButton = newCard.querySelector(".element__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElements.removeChild(newCard);
  });

  const likeButton = newCard.querySelector(".element__like-button");
  likeButton.addEventListener("click", function (event) {
    event.target.classList.toggle("element__like-button_active", true);
  });


  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  const openFigure = newCard.querySelector(".element__image");
  const openFigurePopup = document.querySelector("#figure-popup");
  const closeFigurePopupButton = document.querySelector("#close-figure-popup-button");
  openFigure.addEventListener("click", function () {
    popupImage.src = elementImage.src;
    popupImage.alt = elementImage.alt;
    popupCaption.textContent = elementTitle.textContent;
    openFigurePopup.classList.add("popup_opened");
  });
  closeFigurePopupButton.addEventListener("click", function () {
    closePopup(openFigurePopup);
  });

  return newCard;
}

editAddForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  const name = values["inputTitle"];
  const link = values["inputLink"];
  const value = { name, link };
  const cards = createNewCard(value);
  cardElements.prepend(cards); /* новый элемент добавляем в начало */
  /*form.reset();*/
  closePopup(addPopup);
});

