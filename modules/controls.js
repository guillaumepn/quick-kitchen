import {dishes} from './base';
import {updateActiveDish} from './utils';

function handleControls() {
// Gestion des touches du clavier
    document.addEventListener('keydown', function (e) {
        // Flèches du haut et du bas : sélection du plat
        if (e.code === 'ArrowDown') {
            let currentIndex = undefined;
            dishes.filter(function (dish, index) {
                if (dish.active) currentIndex = index;
            });
            dishes[currentIndex].active = false;
            currentIndex++;
            if (currentIndex >= dishes.length) currentIndex = 0;
            dishes[currentIndex].active = true;
            updateActiveDish(dishes);
        } else if (e.code === 'ArrowUp') {
            let currentIndex = undefined;
            dishes.filter(function (dish, index) {
                if (dish.active) currentIndex = index;
            });
            dishes[currentIndex].active = false;
            currentIndex--;
            if (currentIndex < 0) currentIndex = dishes.length - 1;
            dishes[currentIndex].active = true;
            updateActiveDish(dishes);
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
