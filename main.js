import './styles/main.scss';

import {
    root,
    dishArea,
    dishList,
    ingredientsArea,
    ingredientList,
    topSection
} from './modules/base';

import {handleControls} from './modules/controls';
import {activeDish} from "./modules/utils";

handleControls();

// Ajoute l'ensemble des éléments au DOM
root.append(ingredientsArea, topSection, dishArea);


// Met à jour le DOM à chaque frame
function render() {

    // Affichage du plat sélectionné
    Array.from(document.querySelectorAll('.dish')).filter(function (dish, index) {
        dish.classList.remove('active');
        let chrono = dish.querySelector('.chrono');
        dishList[index].waitingDuration = dishList[index].timer.duration;
        chrono.dataset.duration = dishList[index].timer.duration;
        chrono.innerText = dishList[index].timer.duration;
        if (dishList[index].active) {
            dish.classList.add('active');
        }
        if (dishList[index].timer.done) dish.classList.add('done');
    });

    // Affichage des ingrédients pour le plat sélectionné
    Array.from(document.querySelectorAll('.ingredient')).filter(function (ingredient, index) {
        ingredient.classList.remove('show');
        if (ingredient.dataset.dish === activeDish) ingredient.classList.add('show');
        ingredient.classList.remove('validated');
        if (ingredientList[index].validated) ingredient.classList.add('validated');
    });

    requestAnimationFrame(render);
}

requestAnimationFrame(render);
