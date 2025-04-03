import { initialCards } from "../scripts/cards.js";
import { openImagePopup } from "../scripts/index.js";

// @todo: Функция создания карточки
export function createCard(cardData, deleteCard, openImagePopup, likeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeCard(likeButton));

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
export function displayCards() {
  const cardsContainer = document.querySelector(".places__list");

  for (const cardData of initialCards) {
    const card = createCard(cardData, deleteCard, openImagePopup, likeCard);
    cardsContainer.append(card);
  }
}

// Функция обработки лайка
export function likeCard(likeButton) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }
}
