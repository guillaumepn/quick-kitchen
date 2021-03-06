import Timer from "./classes/timer";
import {
    decreaseDishesCounter,
    dishesCounter,
    dishesCursor,
    dishesHasChanged,
    dishesHasNotChanged,
    increaseDishesCounter,
    increaseDishesCursor, levelDishCounter,
    removeDish,
    score,
    timesUp,
    updateActiveDish,
    updateScore,
    increaseFailedDish,
    increaseSucessDish,
    successDish,
    failedDish
} from "./utils";
import * as levels from '../levels';
import * as dishes from '../dishes';
import Dish from "./classes/dish";
import Ingredient from "./classes/ingredient";
// todo: remplacer plats en cuisson par plat fini et virer le timer css

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
const nextlevel = document.createElement('button');
const history = document.createElement('button');

const modal = document.createElement('div');
const titleModal = document.createElement('h2');
const retryModal = document.createElement('button');
const goToNextLevelModal = document.createElement('button');
const contentModal = document.createElement('div');

modal.classList.add('modal');
contentModal.classList.add('contentModal');

titleModal.innerHTML = 'Récapitulatif du niveau';
goToNextLevelModal.innerHTML = `Passer au niveau suivant`;
retryModal.innerHTML = `Réessayer le niveau`;
modal.append(titleModal, contentModal, retryModal);


const dishList = [];
const dishesShowed = [];
const ingredientList = [];
const ingredientsShowed = [];
const levelDishes = [];
let currentLevel = 1;
let levelDishExpiredCounter = levelDishCounter;

row1.classList.add('row');
row1.classList.add('row1');
row2.classList.add('row');
row2.classList.add('row2');
row3.classList.add('row');
row3.classList.add('row3');

waiters.classList.add('waiters');
// document.body.insertBefore(waiters, root.nextSibling);

topSection.classList.add('top-section');
title.innerText = '';
scoreHtml.innerHTML = `Score : <span class="score">${score}</span>`;
nextlevel.innerHTML = `Passer au niveau suivant`;
history.innerHTML = `Voir le récapitulatif du niveau`;
topSection.append(title, scoreHtml);

dishArea.classList.add('dishes');
ingredientsArea.classList.add('ingredients');
cookingDishArea.classList.add('cooking-dishes');


// Les plats à partir de levels.json et dishes.json pour le niveau actuel
function prepareDishForLevel(currentLevel) {
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
}

prepareDishForLevel(currentLevel);

// Instanciation des plats et ingrédients à partir de leur class
function instantiateIngredients() {
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

    levelDishExpiredCounter = dishList.length;
}

instantiateIngredients();

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

            // Apparition d'un personnage pour chaque nouveau plat

            let imgList = ['abraham.png', 'lisa.png', 'bart.png', 'homer.png', 'marge.png'];

            let img = document.createElement("img");
            img.src = "images/" + imgList[Math.floor(Math.random() * imgList.length)];
            img.style.height = "320px";
            img.className = "waiter_single";

            waiters.appendChild(img);

            // End

            // Le timer du plat a expiré :
            timesUp(dish.timer).then(function () {
                if (!dish.makingCompleted) {
                    const newScore = score - 1;
                    increaseFailedDish();
                    updateScore(newScore);
                    removeDish(dish);
                    decreaseDishesCounter();
                    dishesHasChanged();
                    levelDishExpiredCounter--;

                    // Disparition du personnage
                    img.style.opacity = '0';
                    setTimeout(function(){img.parentNode.removeChild(img);}, 1000);
                    //waiters.removeChild(img);
                }
            });

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
    modal,
    nextlevel,
    history,
    topSection,
    dishArea,
    dishList,
    dishesShowed,
    ingredientsArea,
    ingredientList,
    ingredientsShowed,
    cookingDishArea,
    waiters,
    retryModal,
    goToNextLevelModal,
    contentModal,
    prepareDishForLevel,
    selectDishesShowed,
    displayDishes,
    levelDishExpiredCounter,
};