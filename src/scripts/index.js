import "../pages/index.css"; // Импорт главного файла стилей
import {
  createCard,
  deleteCard,
  displayCards,
  likeCard,
} from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";

// Три модальных окна
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

displayCards();

// Присвоение класса для плавного открытия и закрытия
const allPopup = document.querySelectorAll(".popup");
allPopup.forEach(function (popup) {
  popup.classList.add("popup_is-animated");
});

// Модальное окно редактирования профиля
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description"
);

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
});

// Обработчик отправки формы
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopup);
}

profileForm.addEventListener("submit", handleProfileSubmit);

// Модальное окно добавления карточки
const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});

const newCardForm = document.querySelector('form[name="new-place"]');
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const cardsContainer = document.querySelector(".places__list");

// Обработчик отправки формы
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const card = createCard(newCardData, deleteCard, openImagePopup, likeCard);
  cardsContainer.prepend(card);
  closePopup(newCardPopup);
  newCardForm.reset();
}

newCardForm.addEventListener("submit", handleNewCardSubmit);

// Открытие картинки на весь экран
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

export function openImagePopup(imageLink, imageName) {
  popupImage.src = imageLink;
  popupImage.alt = imageName;
  popupCaption.textContent = imageName;
  openPopup(imagePopup);
}
