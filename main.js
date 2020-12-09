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


// Listaelem megjelenítés és áthelyezése


const listGenerator = (input) => {
    const newChecklistElement = `<div class="checkdiv"><input type="checkbox" id="unchecked">
    <span class="checklist">${input}</span><span class="delete">⛒</span></div>`;

    const parentDiv1 = document.querySelector('.pendingdiv')
    parentDiv1.insertAdjacentHTML('afterbegin', newChecklistElement);
    listMouseHover();
};

const listMover = (event) => {
    console.log(event);
    const newCheckedlistElement = `<div class="checkeddiv"><input type="checkbox" id="checked" checked>
    <span class="checklist">${listitem}</span></div>`;
    
    const parentDiv = document.querySelector('.completeddiv')
    parentDiv.insertAdjacentHTML('afterbegin', newCheckedlistElement);
}


// Törlés gomb megjelenítés és elrejtése

const showDelete = (event) => {
    console.log(event);
    const span = event.currentTarget.children[2];
    span.style.display = 'block';
}

const hideDelete = (event) => {
    const span = event.currentTarget.children[2];
    span.style.display = 'none';
}

const listMouseHover = () => {
    const listItem = document.querySelectorAll('.checkdiv').forEach(item => {
        item.addEventListener(('mouseover'), showDelete);
        item.addEventListener(('mouseout'), hideDelete);
    })
}


// Pipálási esemény

const checkboxClick = () => {
    const checkbox = document.querySelectorAll('#unchecked').forEach(item => {
        checkbox.addEventListener('click', listMover);
    });
}

checkboxClick();
