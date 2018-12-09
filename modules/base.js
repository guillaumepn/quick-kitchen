import Timer from "./classes/timer";
import {timesUp} from "./utils";
import * as levels from '../levels';
import * as dishes from '../dishes';
import Dish from "./classes/dish";
import Ingredient from "./classes/ingredient";

let root = document.getElementById('root');

let topSection = document.createElement('div');
topSection.classList.add('top-section');
let title = document.createElement('h1');

// title.innerText = 'Quick Kitchen';
title.innerText = 'JS Project';

let scoreHtml = document.createElement('h4');
let score = 0;
scoreHtml.innerHTML = `Score : <span class="score">${score}</span>`;

topSection.append(title, scoreHtml);

let currentLevel = 1;


// Les plats
let levelDishes = [];


for (let dishKey in levels[currentLevel]) {
    let dishType = levels[currentLevel][dishKey];
    let dish = Object.create(dishes[dishType]);
    let dishIngredients = [];

    for (let ingredientKey in dish.ingredients) {
        let ingredient = dish.ingredients[ingredientKey];
        if (ingredient.type === 'group') {
            let groupIngredients = ingredient.ingredients;
            let groupIngredientKeys = Object.keys(groupIngredients);
            let randomIngredient = groupIngredients[groupIngredientKeys[groupIngredientKeys.length * Math.random() << 0]]
            dishIngredients.push(randomIngredient);
        } else {
            dishIngredients.push(ingredient);
        }
    }

    dish.finalIngredients = dishIngredients;

    levelDishes.push(dish);
}

let dishArea = document.createElement('div');
dishArea.classList.add('dishes');

let dishList = [];

let ingredientsArea = document.createElement('div');
ingredientsArea.classList.add('ingredients');

let ingredientList = [];

levelDishes.map((dish, index) => {
    let newDish = new Dish(`${dish.name}${index}`, dish.name);
    newDish.waitingDuration = dish.expire + 2;
    newDish.active = index === 0;
    dish.finalIngredients.map(ingredient => {
        newDish.addIngredient(ingredient);
        let newIngredient = new Ingredient(`${ingredient.name}${index}`, ingredient.name, ingredient.letter);
        newIngredient.dish = newDish.id;
        ingredientList.push(newIngredient);
    });
    dishList.push(newDish);
});

console.log(dishList);
console.log(ingredientList);

let activeDish = undefined;

// Affiche les plats et leur timer dans le DOM
dishList.filter((dish, index) => {
    dish.timer = new Timer(`${dish.name}_${index}`, dish.waitingDuration, dish.id);
    // Le timer du plat a expiré :
    timesUp(dish.timer).then(function () {
        score -= 1;
        removeDish(dish);
    });

    let dishHtml = dish.html();
    let dishName = '{{ name }}';
    dishName = dishName.interpolate(dish);
    dishHtml.innerText = dishName;
    dishHtml.appendChild(dish.timer.html());
    if (dish.active) {
        activeDish = dish.id;
        dishHtml.classList.add('active');
    }
    dishArea.append(dishHtml);
});


// Affiche les ingrédients du plat sélectionné dans le DOM
ingredientList.filter((ingredient, index) => {
    let ingredientHtml = ingredient.html();
    let ingredientName = '{{ name }}';
    ingredientName = ingredientName.interpolate(ingredient);
    let ingredientLetter = '{{ letter }}';
    ingredientLetter = ingredientLetter.interpolate(ingredient);
    ingredientHtml.innerHTML = `<div class="letter">${ingredientLetter}</div>${ingredientName}`;
    ingredientHtml.dataset.dish = ingredient.dish;
    ingredientsArea.append(ingredientHtml);
});


function updateActiveDish(dish) {
    activeDish = dish.id;
}

function removeDish(dish) {
    let dishDOM = document.querySelector(`[data-id="${dish.id}"]`);
    let dishIngredientsDOM = document.querySelectorAll(`[data-dish="${dish.id}"]`);
    dishList.splice(dishList.indexOf(dish), 1);
    document.querySelector('.dishes').removeChild(dishDOM);
    Array.from(dishIngredientsDOM).filter(ingredient => document.querySelector('.ingredients').removeChild(ingredient));
}


export {
    root,
    topSection,
    score,
    dishArea,
    dishList,
    ingredientsArea,
    ingredientList,
    activeDish,
    updateActiveDish,
};