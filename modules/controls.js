import {dishList} from './base';

function handleControls() {
// Gestion des touches du clavier
    document.addEventListener('keydown', function (e) {
        // Flèches du haut et du bas : sélection du plat
        if (e.code === 'ArrowDown') {
            let currentIndex = undefined;
            dishList.filter(function (dish, index) {
                if (dish.active) currentIndex = index;
            });
            dishList[currentIndex].active = false;
            currentIndex++;
            if (currentIndex >= dishList.length) currentIndex = 0;
            dishList[currentIndex].active = true;
        } else if (e.code === 'ArrowUp') {
            let currentIndex = undefined;
            dishList.filter(function (dish, index) {
                if (dish.active) currentIndex = index;
            });
            dishList[currentIndex].active = false;
            currentIndex--;
            if (currentIndex < 0) currentIndex = dishList.length - 1;
            dishList[currentIndex].active = true;
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
