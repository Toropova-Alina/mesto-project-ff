import { openImagePopup } from "../scripts/index.js";
import {likeCardApi, unlikeCard, deleteCardApi} from "./api.js"

// @todo: Функция создания карточки
export function createCard(cardData, deleteCard, openImagePopup, likeCard, userId) {
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
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
  deleteButton.addEventListener("click", () => deleteCard(cardElement, cardData._id));
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCard = cardElement.querySelector(".card__like-counter");
  const isLiked = cardData.likes.some(like => like._id === userId);
  if (isLiked)  {
    likeButton.classList.add("card__like-button_is-active");
    likesCard.textContent = cardData.likes.length;
  }
  likeButton.addEventListener("click", () => likeCard(likeButton, cardData._id, likesCard));

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log("Ошибка при удалении карточки:", err);
    });
}

// Функция обработки лайка
export function likeCard(likeButton, cardID, likesCard) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeRequest = isLiked ? unlikeCard : likeCardApi;
  likeRequest(cardID)
    .then((data) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likesCard.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log("Ошибка при лайке/дизлайке карточки:", err);
    });
}
