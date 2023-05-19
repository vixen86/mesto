let openPopupButton =
  document.querySelector(".profile__info-edit-button");
let closePopupButton = document.querySelector(".popup__close-button");
let editPopup = document.querySelector(".popup");

let profileInfoName = document.querySelector(
  ".profile__info-name"
);
let inputName = document.querySelector("#input-name");
let profileInfoAbout = document.querySelector(".profile__info-about");
let inputAbout = document.querySelector("#input-about");

let editForm = document.querySelector(".popup__form");

function openPopup(popup) {
  inputName.value = profileInfoName.textContent;
  inputAbout.value = profileInfoAbout.textContent;
  popup.classList.add("popup_opened");
}

openPopupButton.addEventListener("click", function() {
  openPopup(editPopup);
});

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closePopupButton.addEventListener("click", function() {
  closePopup(editPopup);
});


editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileInfoName.textContent = inputName.value;
  profileInfoAbout.textContent = inputAbout.value;
  closePopup(editPopup);
});
