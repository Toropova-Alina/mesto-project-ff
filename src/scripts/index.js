import "../pages/index.css"; // Импорт главного файла стилей
import { createCard, deleteCard, likeCard } from "../components/card.js";
import {
  openPopup,
  closePopup,
  setCloseModalByClickListeners,
} from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  editProfileApi,
  addCard,
  updateAvatarApi
} from "../components/api.js";

// Основные константы
const editPopup = document.querySelector(".popup_type_edit"); // Модальное окно редактирования профиля
const newCardPopup = document.querySelector(".popup_type_new-card"); // Модальное окно добавления карточки
const imagePopup = document.querySelector(".popup_type_image"); // Модальное окно открытия картинки на весь экран
const avatarPopup = document.querySelector(".popup_type_avatar"); // Модальное окно обнавления аватара пользователя
const allPopup = document.querySelectorAll(".popup"); // Все модальные окна

const profileName = document.querySelector(".profile__title"); // Имя профиля
const profileDescription = document.querySelector(".profile__description"); // Описание профиля
const profileAvatar = document.querySelector(".profile__image"); // Аватар профиля
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
const popupImageCaption = imagePopup.querySelector(".popup__caption"); // Подпись к картинке

const avatarInput = avatarPopup.querySelector(".popup__input_type_url"); // Ссылка на аватар
const avatarForm = document.querySelector('.popup__form[name="avatar"]'); // Форма редактирования аватара

let userId; // ID пользователя
// Конфигурация валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Функция открытия модального окна редактирования профиля
function editProfile() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
  clearValidation(profileForm, validationConfig);
}

function renderLoading(button, isLoading) {
  const initialText = button.textContent;
  const loadingText = "Сохранение...";
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = initialText;
  }
}

// Функция обработки отправки формы изменения профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();

  renderLoading(editButton, true);

  editProfileApi(nameInput.value, descriptionInput.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log("Ошибка при редактировании профиля:", err);
    })
    .finally(() => {
      renderLoading(editButton, false);
      clearValidation(profileForm, validationConfig);
    });
}

// Функция обработки формы добавления карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(addButton, true);

  addCard(cardNameInput.value, cardLinkInput.value)
    .then((newCard) => {
      const card = createCard(newCard, deleteCard, openImagePopup, likeCard, userId);
      cardsContainer.prepend(card);
      closePopup(newCardPopup);
    })
    .catch((err) => {
      console.log("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      renderLoading(addButton, false);
      clearValidation(newCardForm, validationConfig);
    });
}

// Обработчик отправки формы редактирования аватара
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  updateAvatarApi(avatarInput.value)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      clearValidation(avatarForm, validationConfig);
    });
}

// Функция открытия картинки на весь экран
export function openImagePopup(imageLink, imageName) {
  popupImage.src = imageLink;
  popupImage.alt = imageName;
  popupImageCaption.textContent = imageName;
  openPopup(imagePopup);
}

// Функция открытия модального окна аватара
function updateAvatar() {
  avatarInput.value = profileAvatar.style.backgroundImage;
  openPopup(avatarPopup);
  clearValidation(avatarForm, validationConfig);
}

// Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    userId = userData._id;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((cardData) => {
      const card = createCard(
        cardData,
        deleteCard,
        openImagePopup,
        likeCard,
        userId
      );
      cardsContainer.append(card);
    });
  })
  .catch((err) => {
    console.log("Ошибка при загрузке данных:", err);
  });

// Включение валидации всех форм
document.addEventListener("DOMContentLoaded", () => {
  enableValidation(validationConfig);
});

// Модальное окно обновления аватара
profileAvatar.addEventListener("click", updateAvatar);
avatarForm.addEventListener("submit", handleAvatarSubmit); // Обработка отправки формы изменения аватара

// Модальное окно редактирования профиля
editButton.addEventListener("click", editProfile);

// Модальное окно добавления карточки
addButton.addEventListener("click", function () {
  openPopup(newCardPopup);
  clearValidation(newCardForm, validationConfig);
  newCardForm.reset();
});

setCloseModalByClickListeners(allPopup); // Обработка закрытия модальных окон
profileForm.addEventListener("submit", handleProfileSubmit); // Обработка отправки формы изменения профиля
newCardForm.addEventListener("submit", handleNewCardSubmit); // Обработка отправки формы создания новой карточки
