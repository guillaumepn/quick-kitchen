import './styles/main.scss';

import {
    root,
    dishArea,
    ingredientsArea,
    topSection,
    dishesChanged,
    displayDishes,
    selectDishesShowed,
    dishesShowed,
    ingredientsShowed
} from './modules/base';

import {handleControls} from './modules/controls';
import {activeDish, updateActiveDish} from "./modules/utils";

handleControls();

// Ajoute l'ensemble des éléments au DOM
root.append(ingredientsArea, topSection, dishArea);


// Met à jour le DOM à chaque frame
function render() {

    if (dishesChanged) {
        selectDishesShowed();
        displayDishes();
        if (!document.querySelector('.dish.active')) {
            updateActiveDish(dishesShowed[0]);
            dishesShowed[0].active = true;
            const dishShowHtml = dishesShowed[0].html();
            dishShowHtml.classList.add('active');
        }
    }

    // Affichage du plat sélectionné
    Array.from(document.querySelectorAll('.dish')).filter(function (dish, index) {
        dish.classList.remove('active');
        const chrono = dish.querySelector('.chrono');
        if (dishesShowed[index]) {
            dishesShowed[index].waitingDuration = dishesShowed[index].timer.duration;
            chrono.dataset.duration = dishesShowed[index].timer.duration;
            chrono.innerText = dishesShowed[index].timer.duration;
            if (dishesShowed[index].active) {
                dish.classList.add('active');
            }
            if (dishesShowed[index].timer.done) dish.classList.add('done');
        }
    });

    // Affichage des ingrédients pour le plat sélectionné
    Array.from(document.querySelectorAll('.ingredient')).filter(function (ingredient, index) {
        ingredient.classList.remove('show');
        if (ingredient.dataset.dish === activeDish.id) ingredient.classList.add('show');
        ingredient.classList.remove('validated');
        if (ingredientsShowed[index].validated && ingredientsShowed[index].id === ingredient.dataset.id) {
            ingredient.classList.add('validated');
        }
    });

    requestAnimationFrame(render);
}

requestAnimationFrame(render);
