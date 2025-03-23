// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
  
    return cardElement;
  }
  
  // @todo: Функция удаления карточки
  function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  // @todo: Вывести карточки на страницу
  function displayCards() {
    const allCards = document.querySelector('.places__list');

    for (const cardData of initialCards) {
        const card = createCard(cardData, deleteCard);
        allCards.append(card);
    }
  }

  displayCards();