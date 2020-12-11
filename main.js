'use strict';


// Dátum

let time;
const date = new Date();
const today = () => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[date.getDay()];
    const day = zero(date.getDate());
    const month = zero(date.getMonth() + 1);
    const year = date.getFullYear();
    time = [`${weekday}`, `${day}-${month}-${year}`];
    return time;
};

const zero = (number) => {
    return number < 10 ? `0${number}` : number;
}

const todayText = () => {
    const todayName = `${time[0]}`
    const todayDate = `${time[1]}`
    document.querySelector('.today').textContent = todayName;
    document.querySelector('.todaydate').textContent = todayDate;
};



// LocalStorage kezelés
let it;

let tasks = [];
const storageHandler = {
    saveToStorage(key, value) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value)
    },
    getFromStorage() {
        for (let i = localStorage.length; i > 0; i -= 1) {
            tasks.push(JSON.parse(localStorage[i]))
        };
//        const value = localStorage.getItem(tasks);
//        if (!value) {
//            return null;
//        }
        for (let j = 0; j < tasks.length; j += 1) {
            listGenerator(tasks[j]);
        }
    },
    deleteStorage() {
        localStorage.clear()
    }
};


// Input mező

const addClick = (ev) => {
    let input = document.querySelector('.inputfield').value;
    input = input.trim();
    if (input.length === 0) {
        return alert('Írj be valamit a mezőbe a gomb megnyomása előtt!');
    }
    storageHandler.saveToStorage(tasks.push(input), input);
    document.querySelector('.inputfield').value = '';
    listGenerator(input);
    pendingCounter();
    completedCounter();
}

const plusClick = () => {
    const plusButton = document.querySelector('.btn__plus');
    plusButton.addEventListener('click', addClick);
}


// Számlálók

const pendingCounter = () => {
    const pendingNum = document.querySelector('.pendingNumber');
    pendingNum.textContent = document.querySelector('.pendingdiv').childElementCount;
}


const completedCounter = () => {
    const percent = document.querySelector('.completedPercent');
    const firstNum = document.querySelector('.pendingdiv').childElementCount;
    const secondNum = document.querySelector('.completeddiv').childElementCount;

    let percentValue = (secondNum / (firstNum + secondNum) * 100);
    if (isNaN(percentValue)) {
        percent.textContent = `Not yet`;
    } else {
        percent.textContent = `${percentValue.toFixed(0)}%`;
    }
};


// Listaelem megjelenítés és áthelyezése

const listGenerator = (input) => {
    const newChecklistElement = `<div class="checkdiv"><input type="checkbox" id="unchecked">
    <span class="checklist">${input}</span><span class="delete">⛒</span></div>`;

    const parentDiv = document.querySelector('.pendingdiv')
    parentDiv.insertAdjacentHTML('afterbegin', newChecklistElement);
    listMouseHover();
    listDeleter();
    checkboxEvent();
};

const listMover = (ev) => {
    const listText = ev.target.nextElementSibling.textContent;

    const newCheckedlistElement = `<div class="checkeddiv"><input type="checkbox" id="checked" checked disabled>
    <span class="checklist">${listText}</span></div>`;

    const parentDiv = document.querySelector('.completeddiv')
    parentDiv.insertAdjacentHTML('afterbegin', newCheckedlistElement);

    document.querySelector('.checkdiv').remove();
    pendingCounter();
    completedCounter();
};


// Törlés gomb megjelenítés, elrejtése

const showDelete = (ev) => {
    const span = ev.currentTarget.children[2];
    span.style.display = 'block';
};

const hideDelete = (ev) => {
    const span = ev.currentTarget.children[2];
    span.style.display = 'none';
};

const deleteList = (ev) => {
    const list = ev.target.parentElement;
    list.remove();
    pendingCounter();
    completedCounter();
};


const listMouseHover = () => {
    const listItem = document.querySelectorAll('.checkdiv').forEach(item => {
        item.addEventListener('mouseover', showDelete);
        item.addEventListener('mouseout', hideDelete);
    })
};

const listDeleter = () => {
    const deleteSpan = document.querySelectorAll('.delete').forEach(item => {
        item.addEventListener('click', deleteList);
    })
};


// Pipálási esemény

const checkboxEvent = () => {
    const checkboxes = document.querySelectorAll('#unchecked').forEach(item => {
        item.addEventListener('click', listMover);
    })
};


// Show/Hide gomb működése

const showDivs = (ev) => {
    const checkeddiv = document.querySelectorAll('.checkeddiv').forEach(div => {
        div.style.display = 'block';
    })
    showButton.style.display = 'none';
    hideButton.style.display = 'initial';
};

const hideDivs = (ev) => {
    const checkeddiv = document.querySelectorAll('.checkeddiv').forEach(div => {
        div.style.display = 'none';
    })
    hideButton.style.display = 'none';
    showButton.style.display = 'initial';
};

const showButton = document.querySelector('.btn__show');
const listShower = () => {
    showButton.addEventListener('click', showDivs);
};

const hideButton = document.querySelector('.btn__hide');
const listHider = () => {
    hideButton.addEventListener('click', hideDivs);
};


// Clear all gomb

const clearDivs = (ev) => {
    const checkeddiv = document.querySelectorAll('.checkeddiv').forEach(div => {
        div.remove()
    })
    completedCounter();
    storageHandler.deleteStorage();
};

const listCleaner = () => {
    const clearButton = document.querySelector('.btn__clear')
    clearButton.addEventListener('click', clearDivs)
};


// Start

const start = () => {
    const savedTasks = storageHandler.getFromStorage();
    if (savedTasks) {
        tasks = savedTasks;
    }
    today();
    todayText();
    plusClick();
    pendingCounter();
    completedCounter();
    listShower();
    listHider();
    listCleaner();
};

start();