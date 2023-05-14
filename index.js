const openPopupButton =
  document.querySelector("#open-popup-button"); /* ищем id */
const closePopupButton = document.querySelector("#close-popup-button");
const editPopup = document.querySelector("#edit-popup");

const profileInfoName = document.querySelector(
  ".profile__info-name"
); /* ищем class */
const inputName = document.querySelector("#input-name");
const profileInfoAbout = document.querySelector(".profile__info-about");
const inputAbout = document.querySelector("#input-about");

const editForm = document.querySelector("#edit-form");

/* функция открытия попапа */
function openPopup() {
  editPopup.classList.add("popup_opened");
}

/* callback - открываем попап по клику */
openPopupButton.addEventListener("click", openPopup);

/* функция закрытия попапа */
function closePopup() {
  editPopup.classList.remove("popup_opened");
}

/* закрываем попап по кнопке close */
closePopupButton.addEventListener("click", closePopup);

/* стартовое значение полей инпут из профиля */
inputName.value = profileInfoName.textContent;
inputAbout.value = profileInfoAbout.textContent;

/* перезаписываем данные в профиле */
editForm.addEventListener("submit", function (event) {
  event.preventDefault(); /* отмена отправки данных по сабмиту (в form не указываем action="" method="post") */
  profileInfoName.textContent = inputName.value;
  profileInfoAbout.textContent = inputAbout.value;
  closePopup(editPopup);
});