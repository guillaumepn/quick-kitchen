import {dishesShowed} from './base';
import {activeDish, checkCompletedDishMaking, updateActiveDish} from "./utils";

function handleControls() {
// Gestion des touches du clavier
    // Empêche les flèches du clavier de scroller la fenêtre
    window.addEventListener("keydown", function(e) {
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
    
    document.addEventListener('keyup', function (e) {
        // Navigation dans les plats "en attente" :
        if (dishesShowed.length > 0) {
            let currentIndex = 0;
            // Flèches du haut et du bas : sélection du plat
            if (e.code === 'ArrowDown') {
                e.preventDefault();
                dishesShowed.filter(function (dish, index) {
                    if (dish.active) currentIndex = index;
                });
                dishesShowed[currentIndex].active = false;
                currentIndex++;
                if (currentIndex >= dishesShowed.length) currentIndex = 0;
                dishesShowed[currentIndex].active = true;
                updateActiveDish(dishesShowed[currentIndex]);
            } else if (e.code === 'ArrowUp') {
                e.preventDefault();
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

        } else if (e.code === 'ArrowRight') {

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
