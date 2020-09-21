var remember = document.querySelector(".remember");
var forget = document.querySelector(".forget");
var form = document.querySelector('form');
var message = document.querySelector('#message');
var submit = document.querySelector('#submit');
var erase = document.querySelector('#delete');

const h1 = document.querySelector('h1');

form.addEventListener('submit', function (e) {
    e.preventDefault();
});

submit.addEventListener('click', function() {
    localStorage.setItem('message', message.value);

    displayMessage();
});

erase.addEventListener('click', function() {
    localStorage.removeItem('message');

    displayMessage();
});

function displayMessage() {
    if (localStorage.getItem('message')) {
        let message = localStorage.getItem('message');
        h1.textContent = 'Note to Self: ${message}';

        forget.style.display = 'block';
        remember.style.display = 'none';
    } else {
        h1.textContent = 'Leave a Message for Your Future Self:';

        forget.style.display = 'none';
        remember.style.display = 'block';
    }
}
document.body.onload = displayMessage;
console.log(localStorage.getItem('message'));