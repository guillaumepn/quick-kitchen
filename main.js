import './styles/main.scss';

import {root, title, dishArea, dishList} from './modules/base';
import {handleControls} from './modules/controls';

handleControls();

// Met à jour le DOM à chaque frame
function render() {

    // Affichage du plat sélectionné
    Array.from(document.querySelectorAll('.dish')).filter(function (dish, index) {
        dish.classList.remove('active');
        let chrono = dish.querySelector('.chrono');
        dishList[index].waitingDuration = dishList[index].timer.duration;
        chrono.dataset.duration = dishList[index].timer.duration;
        chrono.innerText = dishList[index].timer.duration;
        if (dishList[index].active) dish.classList.add('active');
        if (dishList[index].timer.done) dish.classList.add('done');
    });

    requestAnimationFrame(render);
}

requestAnimationFrame(render);

// Ajoute l'ensemble des éléments au DOM
root.append(title, dishArea);