let openPopupButton =
  document.querySelector(".profile__info-edit-button");
let closePopupButton = document.querySelector(".popup__close-button");
let editPopup = document.querySelector(".popup");

let profileInfoName = document.querySelector(
  ".profile__info-name"
); /* ищем class */
let inputName = document.querySelector("#input-name"); /* ищем id */
let profileInfoAbout = document.querySelector(".profile__info-about");
let inputAbout = document.querySelector("#input-about");

let editForm = document.querySelector(".popup__form");

/* функция открытия любого попапа */
function openPopup(popup) {
  /* стартовое значение полей инпут из профиля */
  inputName.value = profileInfoName.textContent;
  inputAbout.value = profileInfoAbout.textContent;
  popup.classList.add("popup_opened");
}

/* callback - открываем попап по клику */
openPopupButton.addEventListener("click", function() {
  openPopup(editPopup);
});

/* функция закрытия любого попапа */
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

/* закрываем попап по кнопке close */
closePopupButton.addEventListener("click", function() {
  closePopup(editPopup);
});


/* перезаписываем данные в профиле */
editForm.addEventListener("submit", function (event) {
  event.preventDefault(); /* отмена отправки данных по сабмиту (в form не указываем action="" method="post") */
  profileInfoName.textContent = inputName.value;
  profileInfoAbout.textContent = inputAbout.value;
  closePopup(editPopup);
});
