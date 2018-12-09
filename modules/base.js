import Timer from "./classes/timer";
import {removeDish, timesUp, updateActiveDish, updateScore} from "./utils";
import * as levels from '../levels';
import * as dishes from '../dishes';
import Dish from "./classes/dish";
import Ingredient from "./classes/ingredient";

const root = document.getElementById('root');
const topSection = document.createElement('div');
const title = document.createElement('h1');
const scoreHtml = document.createElement('h4');
const dishArea = document.createElement('div');
const ingredientsArea = document.createElement('div');
const dishList = [];
const dishesShowed = [];
const ingredientList = [];
const levelDishes = [];
let score = 0;
let currentLevel = 1;
let dishesCursor = 0;
let dishesCounter = 0;
let dishesChanged = false;

topSection.classList.add('top-section');
title.innerText = 'JS Project';
scoreHtml.innerHTML = `Score : <span class="score">${score}</span>`;
topSection.append(title, scoreHtml);

dishArea.classList.add('dishes');
ingredientsArea.classList.add('ingredients');


// Les plats à partir de levels.json et dishes.json pour le niveau actuel
for (const dishKey in levels[currentLevel]) {
    const dishType = levels[currentLevel][dishKey];
    const dish = Object.create(dishes[dishType]);
    const dishIngredients = [];

    for (const ingredientKey in dish.ingredients) {
        const ingredient = dish.ingredients[ingredientKey];
        if (ingredient.type === 'group') {
            const groupIngredients = ingredient.ingredients;
            const groupIngredientKeys = Object.keys(groupIngredients);
            const randomIngredient = groupIngredients[groupIngredientKeys[groupIngredientKeys.length * Math.random() << 0]];
            dishIngredients.push(randomIngredient);
        } else {
            dishIngredients.push(ingredient);
        }
    }

    dish.finalIngredients = dishIngredients;
    levelDishes.push(dish);
}


// Instanciation des plats et ingrédients à partir de leur class
levelDishes.map((dish, index) => {
    const newDish = new Dish(`${dish.name}${index}`, dish.name);
    newDish.waitingDuration = dish.expire + 2;
    newDish.active = index === 0;
    newDish.showed = false;
    dish.finalIngredients.map((ingredient, ingredientIndex) => {
        const newIngredient = new Ingredient(`${ingredient.name}${ingredientIndex}`, ingredient.name, ingredient.letter);
        newIngredient.dish = newDish.id;
        newIngredient.validated = false;
        newDish.addIngredient(newIngredient);
        ingredientList.push(newIngredient);
    });
    dishList.push(newDish);
});

console.log(dishList)

// Sélectionne les plats à montrer dans le DOM (plats "en attente")
function selectDishesShowed() {
    dishList.filter((dish, index) => {
        if (index >= dishesCursor && dishesCounter < 3 && !dish.showed) {
            dish.showed = true;
            dishesShowed.push(dish);
            dishesCursor++;
            dishesCounter++;
        }
    });
}

selectDishesShowed();

// Affiche les plats et leur timer dans le DOM
function displayDishes() {
    dishesShowed.filter((dish, index) => {
        dish.timer = new Timer(`${dish.name}_${index}`, dish.waitingDuration, dish.id);
        // Le timer du plat a expiré :
        // timesUp(dish.timer).then(function () {
        //     score -= 1;
        //     dishesCounter--;
        //     dishesChanged = true;
        //     updateScore(score);
        //     removeDish(dish);
        // });

        const dishHtml = dish.html();
        let dishName = '{{ id }}';
        dishName = dishName.interpolate(dish);
        dishHtml.innerText = dishName;
        dishHtml.appendChild(dish.timer.html());
        if (dish.active) {
            updateActiveDish(dish);
            dishHtml.classList.add('active');
        }
        dishArea.append(dishHtml);
    });
    dishesChanged = false;
}

displayDishes();


// Affiche les ingrédients du plat sélectionné dans le DOM
ingredientList.filter(ingredient => {
    const ingredientHtml = ingredient.html();
    let ingredientName = '{{ name }}';
    ingredientName = ingredientName.interpolate(ingredient);
    let ingredientLetter = '{{ letter }}';
    ingredientLetter = ingredientLetter.interpolate(ingredient);
    ingredientHtml.innerHTML = `<div class="letter">${ingredientLetter}</div>${ingredientName}`;
    ingredientHtml.dataset.dish = ingredient.dish;
    ingredientsArea.append(ingredientHtml);
});


export {
    root,
    topSection,
    score,
    dishArea,
    dishList,
    dishesShowed,
    ingredientsArea,
    ingredientList,
    selectDishesShowed,
    displayDishes,
    dishesChanged,
};