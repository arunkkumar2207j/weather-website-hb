console.log('client side JS file is loaded');

fetch('https://puzzle.mead.io/puzzle').then(response => {
    response.json().then(data => {
        // console.log('data', data);
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + location).then(response => {
        response.json().then(data => {
            if(data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = "";
                return;
            }
            messageOne.textContent = '';
            messageTwo.textContent = data.forecast.temperature;
        });
    })

})