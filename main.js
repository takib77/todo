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
    listGenerator(input);
    document.querySelector('.inputfield').value = '';
    pendingCounter(data);
    //    completedCounter(data);
}

const plusClick = () => {
    const plusButton = document.querySelector('.btn__plus');
    plusButton.addEventListener('click', addClick);
}

plusClick();


// Számlálók

const pendingCounter = (arr) => {
    const number = document.querySelector('.pendingNumber');
    number.textContent = arr.length;
}

//let copyArray = [];
//const completedCounter = (arr) => {
//    const percent = document.querySelector('.completedPercent');
//    if (arr.length !== 0) {
//        copyArray.concat(arr);
//    }
//    let percentValue = copyArray.length / arr.length * 100;
//    if (percentValue === NaN) {
//        percent.textContent = `Not yet`;
//    } else {
//        percent.textContent = `${percentValue}%`;
//    }
//};
//
//completedCounter(data);


// Lista megjelenítés


const listGenerator = (input) => {
    const newDomElement = `<div class="checkdiv"><input type="checkbox" id="checkbox">
<span class="checklist">${input}</span><span class="delete">⛒</span></div>`;
    document.querySelector('.pendingdiv').innerHTML = newDomElement;  //Egyenlő helyett hozzácsatolás kellene
    listHover();
};


// Törlés gomb megjelenítés

const showDelete = (event) => {
    const span = event.currentTarget.children[2];
    span.style.display = 'block';
}

const hideDelete = (event) => {
    const span = event.currentTarget.children[2];
    span.style.display = 'none';
}

const listHover = () => {
    const listItem = document.querySelectorAll('.checkdiv').forEach(item => {
        item.addEventListener(('mouseover'), showDelete);
        item.addEventListener(('mouseout'), hideDelete);
    })
    //    listItem.addEventListener(('mouseover'), showDelete);
    //    listItem.addEventListener(('mouseout'), hideDelete);
}


