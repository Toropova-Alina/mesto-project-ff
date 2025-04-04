import "../pages/index.css"; // Импорт главного файла стилей
import { createCard, deleteCard, likeCard } from "../components/card.js";
import {
  openPopup,
  closePopup,
  setCloseModalByClickListeners,
} from "../components/modal.js";
import { initialCards } from "./cards.js";

// Основные константы
const editPopup = document.querySelector(".popup_type_edit"); // Модальное окно редактирования профиля
const newCardPopup = document.querySelector(".popup_type_new-card"); // Модальное окно добавления карточки
const imagePopup = document.querySelector(".popup_type_image"); // Модальное окно открытия картинки на весь экран
const allPopup = document.querySelectorAll(".popup"); // Все модальные окна

const profileName = document.querySelector(".profile__title"); // Имя профиля
const profileDescription = document.querySelector(".profile__description"); // Описание профиля
const profileForm = document.querySelector('form[name="edit-profile"]'); // Форма изменения данных профиля
const nameInput = editPopup.querySelector(".popup__input_type_name"); // Имя профиля при открытии формы редактирования профиля
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description"
); // Описание профиля при открытии формы редактирования профиля
const editButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования профиля

const addButton = document.querySelector(".profile__add-button"); // Кнопка добавления новой карточки
const newCardForm = document.querySelector('form[name="new-place"]'); // Форма добавления новой карточки
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name"); // Название новой карточки
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url"); // ССылка на картинку новой карточки
const cardsContainer = document.querySelector(".places__list"); // Все карточки
const popupImage = imagePopup.querySelector(".popup__image"); // Картинка, выводящаяся на весь экран
const popupCaption = imagePopup.querySelector(".popup__caption"); // Подпись к картинке

// Функция вывода карточек на страницу
function displayCards() {
  const cardsContainer = document.querySelector(".places__list");

  for (const cardData of initialCards) {
    const card = createCard(cardData, deleteCard, openImagePopup, likeCard);
    cardsContainer.append(card);
  }
}
displayCards();

// Функция открытия модального окна редактирования профиля
function editProfile() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
}

// Функция обработки отправки формы изменения профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopup);
}

// Функция обработки формы добавления карточки
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

// Функция открытия картинки на весь экран
export function openImagePopup(imageLink, imageName) {
  popupImage.src = imageLink;
  popupImage.alt = imageName;
  popupCaption.textContent = imageName;
  openPopup(imagePopup);
}

// Модальное окно редактирования профиля
editButton.addEventListener("click", editProfile);

// Модальное окно добавления карточки
addButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});

setCloseModalByClickListeners(allPopup); // Обработка закрытия модальных окон
profileForm.addEventListener("submit", handleProfileSubmit); // Обработка отправки формы изменения профиля
newCardForm.addEventListener("submit", handleNewCardSubmit); // Обработка отправки формы создания новой карточки
