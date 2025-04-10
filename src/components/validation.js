// Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Функция скрытия ошибки
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

// Проверка валидности поля
const isValid = (formElement, inputElement, settings) => {
  if (inputElement.validity.valueMissing) {
    showInputError(
      formElement,
      inputElement,
      "Вы пропустили это поле",
      settings
    );
  } else if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    showInputError(
      formElement,
      inputElement,
      inputElement.dataset.errorMessage,
      settings
    );
  } else if (inputElement.validity.typeMismatch) {
    showInputError(
      formElement,
      inputElement,
      inputElement.dataset.errorMessage,
      settings
    );
  } else if (inputElement.validity.tooShort) {
    const minLength = inputElement.minLength;
    const currentLength = inputElement.value.length;
    showInputError(
      formElement,
      inputElement,
      `Минимальное количество символов: ${minLength}. Длина текста сейчас: ${currentLength} символов`,
      settings
    );
  } else {
    inputElement.setCustomValidity("");
    hideInputError(formElement, inputElement, settings);
  }
};

// Переключение состояния кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

// Установка слушателей событий
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

// Включение валидации всех форм
export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

// Очистка ошибок валидации
export const clearValidation = (profileForm, settings) => {
  const inputList = Array.from(
    profileForm.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = profileForm.querySelector(
    settings.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputError(profileForm, inputElement, settings);
    inputElement.value = "";
  });
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true;
};
