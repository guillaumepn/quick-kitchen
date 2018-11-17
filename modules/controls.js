import {dishes} from './base';
import {updateActiveDish} from './utils';

function handleControls() {
// Gestion des touches du clavier
    document.addEventListener('keyup', function (e) {
        if (e.key === 'ArrowDown') {
            let currentIndex = undefined;
            dishes.filter(function (dish, index) {
                if (dish.active) currentIndex = index;
            });
            dishes[currentIndex].active = false;
            currentIndex++;
            if (currentIndex >= dishes.length) currentIndex = 0;
            dishes[currentIndex].active = true;
            updateActiveDish(dishes);
        } else if (e.key === 'ArrowUp') {
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
    });
}

module.exports = {
    handleControls
};
