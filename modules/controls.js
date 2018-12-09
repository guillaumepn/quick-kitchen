import {dishesShowed} from './base';
import {updateActiveDish} from "./utils";

function handleControls() {
// Gestion des touches du clavier
    document.addEventListener('keydown', function (e) {
        // Navigation dans les plats "en attente" :
        if (dishesShowed.length > 0) {
            if (!document.querySelector('.dish.active')) {
                updateActiveDish(dishesShowed[0]);
                dishesShowed[0].active = true;
                const dishShowHtml = dishesShowed[0].html();
                dishShowHtml.classList.add('active');
            }
            // Flèches du haut et du bas : sélection du plat
            if (e.code === 'ArrowDown') {
                let currentIndex = undefined;
                dishesShowed.filter(function (dish, index) {
                    if (dish.active) currentIndex = index;
                });
                dishesShowed[currentIndex].active = false;
                currentIndex++;
                if (currentIndex >= dishesShowed.length) currentIndex = 0;
                dishesShowed[currentIndex].active = true;
                updateActiveDish(dishesShowed[currentIndex]);
            } else if (e.code === 'ArrowUp') {
                let currentIndex = undefined;
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
}

module.exports = {
    handleControls
};
