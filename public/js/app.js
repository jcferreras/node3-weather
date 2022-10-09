console.log('Client side javascript file is loaded');

fetch('https://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#weatherOne');
const messageTwo = document.querySelector('#weatherTwo');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = searchElement.value;
  messageOne.textContent = 'Please wait...';
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((weather) => {
      messageOne.textContent = '';
      if (weather.error) {
        messageOne.textContent = weather.error;
        messageTwo.textContent = '';
      } else {
        messageOne.textContent = `The current weather in ${weather.address} is ${weather.temperature}`;
        messageTwo.textContent = '';
      }
    });
  });
});
