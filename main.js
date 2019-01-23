import './styles/main.scss';

import {
    root,
    row1,
    row2,
    row3,
    dishArea,
    ingredientsArea,
    cookingDishArea,
    topSection,
    waiters,
    displayDishes,
    selectDishesShowed,
    dishesShowed,
    ingredientsShowed,
    levelDishExpiredCounter,
} from './modules/base';

import {handleControls} from './modules/controls';
import {activeDish, dishesChanged, updateActiveDish, levelDishValidatedCounter, endLevel, levelEnded} from "./modules/utils";

handleControls();

// Ajoute l'ensemble des éléments au DOM
row1.append(ingredientsArea, topSection, dishArea);
row2.append(cookingDishArea);
row3.append(waiters);
root.append(row1, row2, row3);


// Met à jour le DOM à chaque frame
function render() {

    if (dishesChanged) {
        selectDishesShowed();
        displayDishes();
        if (dishesShowed.length > 0 && !document.querySelector('.dish.active')) {
            updateActiveDish(dishesShowed[0]);
        }
    }

    if (levelDishValidatedCounter + levelDishExpiredCounter === 0) {
        endLevel();
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
