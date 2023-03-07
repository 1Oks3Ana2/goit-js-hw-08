import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";

const formRef = document.querySelector(".feedback-form");
const inputEmailRef = document.querySelector('[type = "email"]');
const inputMessageRef = document.querySelector('[name="message"]');

formRef.addEventListener("input", throttle(onTextInput, 500));
formRef.addEventListener("submit", onFormSubmit);

fillTextArea();

function onTextInput(e) {
  const enteredData = {
    email: inputEmailRef.value,
    message: inputMessageRef.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(enteredData));
}

function onFormSubmit(e) {
  e.preventDefault();

  let email = e.currentTarget.elements.email.value;
  let message = e.currentTarget.elements.message.value;

  const inputData = {
    email,
    message,
  };

  console.log(inputData);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function fillTextArea(e) {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const normalizedData = JSON.parse(savedData);

    const { email, message } = normalizedData;

    inputEmailRef.value = email;
    inputMessageRef.value = message;
  }
}
