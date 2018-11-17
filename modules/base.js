let root = document.getElementById('root');

let title = document.createElement('h1');
title.innerText = 'Quick Kitchen';

let timerImage = document.createElement('img');
timerImage.src = 'images/timer.svg';
timerImage.classList.add('icon');

// Les plats
let dishArea = document.createElement('div');
dishArea.classList.add('dishes');

let dishes = [
    {name: 'frites', active: true},
    {name: 'moules', active: false},
    {name: 'steak', active: false},
];

module.exports = {
    root,
    title,
    timerImage,
    dishArea,
    dishes,
};