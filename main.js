import './styles/main.scss';

import {root, title, timerImage, dishArea, dishes} from './modules/base';
import Tomate from './modules/classes/ingredients/Tomate';
import Pizza from './modules/classes/dishes/Pizza';
import {handleControls} from './modules/controls';
import {updateActiveDish} from './modules/utils';

// Crée une div pour chaque plat et assigne la classe `active` au premier plat
dishes.filter(function (dish) {
    let newDish = document.createElement('div');
    newDish.classList.add('dish');
    newDish.innerText = dish.name;
    dishArea.append(newDish);
    if (dish.active) newDish.classList.add('active');
});

updateActiveDish(dishes);

let tomate = new Tomate('la', 'tomate');
let pizza = new Pizza('la', 'pizza');

console.log(tomate.display());
console.log(pizza.html());

pizza.addIngredient(tomate);

console.log(pizza.showIngredients());

handleControls();

// Ajoute l'ensemble des éléments au DOM
root.append(title, timerImage, dishArea);