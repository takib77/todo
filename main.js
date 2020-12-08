'use strict';


// Dátum

let time;
const date = new Date();
const today = () => {
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[date.getDay()];
    const day = zero(date.getDate());
    const month = zero(date.getMonth() + 1);
    const year = date.getFullYear();
    time = [`${hours}:${minutes}:${seconds}`, `${weekday}`, `${day}-${month}-${year}`];
    return time;
};

const zero = (number) => {
    return number < 10 ? `0${number}` : number;
}

const todayText = () => {
    const line1 = `${time[1]}`
    const line2 = `${time[2]}`
    document.querySelector('.today').textContent = line1;
    document.querySelector('.todaydate').textContent = line2;
};

today();
todayText();


// Input mező

const data = [];
const addClick = (event) => {
    let input = document.querySelector('.inputfield').value;
    input = input.trim();
    if (input.length === 0) {
        return alert('Írj be valamit a mezőbe a gomb megnyomása előtt!');
    }
    data.push(input)
    document.querySelector('.inputfield').value = '';
    pendingCounter(data);
}

const plusClick = () => {
    const plusButton = document.querySelector('.btn__plus');
    plusButton.addEventListener('click', addClick);
}

plusClick();

const pendingCounter = (arr) => {
    let number = document.querySelector('.pendingNumber');
    number.textContent = arr.length;
}

