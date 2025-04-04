// Функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseByEsc);
}
// Функция закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseByEsc);
}

// Колбэк закрытие по ESC
function handleCloseByEsc(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

// Обработка закрытия
export function setCloseModalByClickListeners(popupList) {
  popupList.forEach((popup) => {
    // По крестику
    const close = popup.querySelector(".popup__close");
    close.addEventListener("click", () => closePopup(popup));

    // По клику вне контента
    popup.addEventListener("click", (e) => {
      if (e.target === popup) closePopup(popup);
    });
  });
}
