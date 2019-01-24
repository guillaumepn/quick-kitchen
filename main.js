import './styles/main.scss';

import {
    root,
    row1,
    row2,
    row3,
    modal,
    nextlevel,
    history,
    dishArea,
    ingredientsArea,
    cookingDishArea,
    topSection,
    waiters,
    contentModal,
    prepareDishForLevel,
    displayDishes,
    selectDishesShowed,
    dishesShowed,
    ingredientsShowed,
    levelDishExpiredCounter,
    retryModal,
    goToNextLevelModal,
} from './modules/base';

import {handleControls} from './modules/controls';
import {activeDish, dishesChanged, updateActiveDish, levelDishValidatedCounter, endLevel, levelEnded, score, failedDish, successDish} from "./modules/utils";

const scoreModal = document.createElement('div');
const successDishModal = document.createElement('div');
const failedDishModal = document.createElement('div');

handleControls();

// Ajoute l'ensemble des éléments au DOM
row1.append(ingredientsArea, topSection, dishArea);
row2.append(cookingDishArea);
row3.append(waiters);
root.append(row1, row2, row3, modal);


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

goToNextLevelModal.addEventListener('click', function () {
    prepareDishForLevel(2);
});

retryModal.addEventListener('click', function () {
    window.history.back();
    modal.style.display = 'none';
    setTimeout(() => {
        window.location.reload();
    }, 1000);
});

nextlevel.addEventListener('click', function () {
    prepareDishForLevel(2);
});

history.addEventListener('click', function () {
    let stateObj = { score: score, successDish: successDish, failedDish: failedDish };
    window.history.pushState(stateObj, "page récapitulative score", "/recap");

    scoreModal.innerHTML = `Score : <span class="score">${window.history.state.score}</span>`;
    successDishModal.innerHTML = `Plats réussis : <span class="score">${window.history.state.successDish}</span>`;
    failedDishModal.innerHTML = `Plats ratés : <span class="score">${window.history.state.failedDish}</span>`;
    contentModal.append(scoreModal, successDishModal, failedDishModal);
    document.getElementsByClassName('modal')[0].style.display = "block";

});


requestAnimationFrame(render);
