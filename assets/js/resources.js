var remember = document.querySelector(".remember");
var forget = document.querySelector(".forget");
var form = document.querySelector('form');
var message = document.querySelector('#message');
var submit = document.querySelector('#submit');
var erase = document.querySelector('#delete');

form.addEventListener('submit', function (e) {
    e.preventDefault();
});

submit.addEventListener('click', function() {
    localStorage.setItem('message', message.value);

    // function
});

erase.addEventListener('click', function() {
    localStorage.setItem('message');

    // function
});