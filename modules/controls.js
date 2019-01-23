import {dishesShowed} from './base';
import {activeDish, cookShowed, activeCook, checkCompletedDishMaking, updateActiveDish, updateActiveCook} from "./utils";

function handleControls() {
// Gestion des touches du clavier
    document.addEventListener('keyup', function (e) {
        // Navigation dans les plats "en attente" :
        if (dishesShowed.length > 0) {
            let currentIndex = 0;
            // Flèches du haut et du bas : sélection du plat
            if (e.code === 'ArrowDown') {
                dishesShowed.filter(function (dish, index) {
                    if (dish.active) currentIndex = index;
                });
                dishesShowed[currentIndex].active = false;
                currentIndex++;
                if (currentIndex >= dishesShowed.length) currentIndex = 0;
                dishesShowed[currentIndex].active = true;
                updateActiveDish(dishesShowed[currentIndex]);
            } else if (e.code === 'ArrowUp') {
                dishesShowed.filter(function (dish, index) {
                    if (dish.active) currentIndex = index;
                });
                dishesShowed[currentIndex].active = false;
                currentIndex--;
                if (currentIndex < 0) currentIndex = dishesShowed.length - 1;
                dishesShowed[currentIndex].active = true;
                updateActiveDish(dishesShowed[currentIndex]);
            }
        }

        // Flèches de gauche et droite : sélection du plat en cuisson
        else if (e.code === 'ArrowLeft') {
            cookShowed.filter(function (dish, index) {
                if (dish.active) currentIndex = index;
            });
            cookShowed[currentIndex].active = false;
            currentIndex++;
            if (currentIndex >= cookShowed.length) currentIndex = 0;
            cookShowed[currentIndex].active = true;
            updateActiveCook(cookShowed[currentIndex]);

        } else if (e.code === 'ArrowRight') {
            cookShowed.filter(function (dish, index) {
                if (dish.active) currentIndex = index;
            });
            cookShowed[currentIndex].active = false;
            currentIndex--;
            if (currentIndex < 0) currentIndex = cookShowed.length - 1;
            cookShowed[currentIndex].active = true;
            updateActiveCook(cookShowed[currentIndex]);
        }
    });

    document.addEventListener('keypress', function (e) {
        for (let ingredient of activeDish.ingredients) {
            if (e.key === ingredient.letter.toLowerCase() && !ingredient.validated) {
                ingredient.validated = true;
                checkCompletedDishMaking(activeDish);
                break;
            }
        }
    });
}

module.exports = {
    handleControls
};
