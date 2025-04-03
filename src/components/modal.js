// Функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClose);
}
// Функция закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClose);
}

// Колбэк закрытие по ESC
function escClose(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

// Обработка закрытия
document.querySelectorAll(".popup").forEach((popup) => {
  // По крестику
  const close = popup.querySelector(".popup__close");
  close.addEventListener("click", () => closePopup(popup));

  // По клику вне контента
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup(popup);
  });
});
