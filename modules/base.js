import Tomate from "./classes/ingredients/Tomate";
import Pizza from "./classes/dishes/Pizza";
import Timer from "./classes/timer";
import {timesUp, interpolate} from "./utils";

let root = document.getElementById('root');

let title = document.createElement('h1');
title.innerText = 'Quick Kitchen';

// Les plats
let dishArea = document.createElement('div');
dishArea.classList.add('dishes');

let tomate = new Tomate('tomate', 'Tomate');
let pizza1 = new Pizza('pizza', 'Pizza');
let pizza2 = new Pizza('pizza', 'Pizza');
let pizza3 = new Pizza('pizza', 'Pizza');

pizza1.waitingDuration = 12;
pizza2.waitingDuration = 8;
pizza3.waitingDuration = 10;

pizza1.active = true;
pizza2.active = false;
pizza3.active = false;

pizza1.addIngredient(tomate);
pizza2.addIngredient(tomate);
pizza3.addIngredient(tomate);

let dishList = [];

dishList.push(pizza1, pizza2, pizza3);

// Affiche les plats et leur timer dans le DOM
dishList.filter((dish, index) => {
    dish.timer = new Timer(`${dish.name}_${index}`, dish.waitingDuration, dish.id);
    timesUp(dish.timer).then(function () {
        console.log("its over!", dish.timer);
    });

    let dishHtml = dish.html();
    let dishName = '{{ dish.name }}';
    dishName = dishName.interpolate(dish);
    dishHtml.innerText = dishName;
    dishHtml.appendChild(dish.timer.html());
    if (dish.active) dishHtml.classList.add('active');
    dishArea.append(dishHtml);
});


// Les ingrédients
let ingredientsArea = document.createElement('div');
ingredientsArea.classList.add('ingredients');

let ingredientList = [];


module.exports = {
    root,
    title,
    dishArea,
    dishList,
    ingredientsArea,
    ingredientList,
};