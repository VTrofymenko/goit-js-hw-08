import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  feedbackFormInput: document.querySelector('input'),
  feedbackFormTextArea: document.querySelector('textarea'),
};

const DEFAULT_VALUE = {};
const LOCAL_STORAGE_KEY = 'feedback-form-state';
const ERROR_MESSAGE = 'Empty fields are forbidden!!!';
let currentData;

refs.feedbackForm.addEventListener('input', throttle(onInputChange, 500));
refs.feedbackForm.addEventListener('submit', onFormSubmit);
addEventListener('DOMContentLoaded', setFormDataFromStorage);

function onInputChange(event) {
  currentData = storageActions.loadItem(LOCAL_STORAGE_KEY, DEFAULT_VALUE);
  currentData[event.target.name] = event.target.value;
  storageActions.saveItem(LOCAL_STORAGE_KEY, currentData);
}

function setFormDataFromStorage() {
  currentData = storageActions.loadItem(LOCAL_STORAGE_KEY, DEFAULT_VALUE);

  if (currentData.email) {
    refs.feedbackFormInput.value = currentData.email;
  }
  if (currentData.message) {
    refs.feedbackFormTextArea.value = currentData.message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (refs.feedbackFormInput.value !== '' && refs.feedbackFormTextArea.value !== '') {
    event.currentTarget.reset();
    console.log(currentData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } else {
    alert(ERROR_MESSAGE);
  }
}

const storageActions = {
  saveItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  loadItem(key, defaultValue) {
    try {
      const result = JSON.parse(localStorage.getItem(key));
      return result ? result : defaultValue;
    } catch (error) {
      return null;
    }
  },
};
