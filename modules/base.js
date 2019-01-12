import Timer from "./classes/timer";
import {
    decreaseDishesCounter,
    dishesCounter,
    dishesCursor,
    dishesHasChanged,
    dishesHasNotChanged,
    increaseDishesCounter,
    increaseDishesCursor,
    removeDish,
    score,
    timesUp,
    updateActiveDish,
    updateScore
} from "./utils";
import * as levels from '../levels';
import * as dishes from '../dishes';
import Dish from "./classes/dish";
import Ingredient from "./classes/ingredient";

const row1 = document.createElement('div');
const row2 = document.createElement('div');
const row3 = document.createElement('div');
const root = document.getElementById('root');
const topSection = document.createElement('div');
const title = document.createElement('h1');
const scoreHtml = document.createElement('h4');
const dishArea = document.createElement('div');
const ingredientsArea = document.createElement('div');
const cookingDishArea = document.createElement('div');
const waiters = document.createElement('div');

const dishList = [];
const dishesShowed = [];
const ingredientList = [];
const ingredientsShowed = [];
const levelDishes = [];
let currentLevel = 1;

row1.classList.add('row');
row1.classList.add('row1');
row2.classList.add('row');
row2.classList.add('row2');
row3.classList.add('row');
row3.classList.add('row3');

waiters.classList.add('waiters');
document.body.insertBefore(waiters, root.nextSibling);

topSection.classList.add('top-section');
title.innerText = '';
scoreHtml.innerHTML = `Score : <span class="score">${score}</span>`;
topSection.append(title, scoreHtml);

dishArea.classList.add('dishes');
ingredientsArea.classList.add('ingredients');
cookingDishArea.classList.add('cooking-dishes');


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
        const newIngredient = new Ingredient(`${ingredient.name}${index}${ingredientIndex}`, ingredient.name, ingredient.letter);
        newIngredient.dish = newDish.id;
        newIngredient.validated = false;
        newDish.addIngredient(newIngredient);
        ingredientList.push(newIngredient);
    });
    dishList.push(newDish);
});


// Sélectionne les plats à montrer dans le DOM (plats "en attente")
function selectDishesShowed() {
    dishList.filter((dish, index) => {
        if (index >= dishesCursor && dishesCounter < 3 && !dish.showed) {
            dish.showed = true;
            dishesShowed.push(dish);
            increaseDishesCursor();
            increaseDishesCounter();

            ingredientList.filter(ingredient => {
                if (ingredient.dish === dish.id && !ingredient.showed) {
                    ingredient.showed = true;
                    ingredientsShowed.push(ingredient);
                }
            })
        }
    });
}

selectDishesShowed();

// Affiche les plats et leur timer dans le DOM
function displayDishes() {
    dishesShowed.filter((dish, index) => {
        if (!dish.timer) {
            dish.timer = new Timer(`${dish.name}_${index}`, dish.waitingDuration, dish.id);
            // Le timer du plat a expiré :
            timesUp(dish.timer).then(function () {
                if (!dish.makingCompleted) {
                    const newScore = score - 1;
                    updateScore(newScore);
                    removeDish(dish);
                    decreaseDishesCounter();
                    dishesHasChanged();
                }
            });

            const dishHtml = dish.html();
            let dishName = '{{ id }}';
            dishName = dishName.interpolate(dish);
            dishHtml.innerText = dishName;
            dishHtml.appendChild(dish.timer.html());

            // Apparition d'un personnage pour chaque nouveau plat

            var img = document.createElement("img");
            img.src = "images/abraham.png";
            img.style.width = "150px";

            var newContent = document.createTextNode('<img src="images/abraham.png">'); 
            waiters.appendChild(img);

            console.log("arrivant");

            // End
            if (dish.active) {
                updateActiveDish(dish);
                dishHtml.classList.add('active');
            }
            dishArea.append(dishHtml);

            dish.ingredients.filter(ingredient => {
                const ingredientHtml = ingredient.html();
                let ingredientName = '{{ name }}';
                ingredientName = ingredientName.interpolate(ingredient);
                let ingredientLetter = '{{ letter }}';
                ingredientLetter = ingredientLetter.interpolate(ingredient);
                ingredientHtml.innerHTML = `<div class="letter">${ingredientLetter}</div>${ingredientName}`;
                ingredientHtml.dataset.dish = ingredient.dish;
                ingredientHtml.dataset.id = ingredient.id;
                ingredientsArea.append(ingredientHtml);
            });
        }
    });
    dishesHasNotChanged();
}

displayDishes();


export {
    root,
    row1,
    row2,
    row3,
    topSection,
    dishArea,
    dishList,
    dishesShowed,
    ingredientsArea,
    ingredientList,
    ingredientsShowed,
    cookingDishArea,
    selectDishesShowed,
    displayDishes,
};