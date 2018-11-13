import './styles/main.scss';

let root = document.getElementById('root');

let title = document.createElement('h1');
title.innerText = 'Quick Kitchen';

let timerImage = document.createElement('img');
timerImage.src = 'images/timer.svg';

root.append(title, timerImage);