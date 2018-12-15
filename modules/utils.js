import {dishesShowed, ingredientsShowed} from "./base";

let activeDish = undefined;
let score = 0;
let dishesCursor = 0;
let dishesCounter = 0;
let dishesChanged = false;

String.prototype.interpolate = function (object) {
    const prop = this
        .replace('{{', '')
        .replace('}}', '')
        .trim();

    return prop_access(object, prop);
};

function timesUp(timer) {
    return new Promise(resolve => {
        setTimeout(resolve, timer.duration * 1000);
    });
}

function prop_access(object, string) {
    const props = string.split('.');
    let res = object;
    props.map(prop => {
        res = res[prop];
    });
    return res || string;
}

function updateActiveDish(dish) {
    dish.active = true;
    activeDish = dish;
    const dishShowHtml = dish.html();
    dishShowHtml.classList.add('active');
}

function checkCompletedDishMaking(dish) {
    let completed = true;
    dish.ingredients.filter(ingredient => {
        if (!ingredient.validated) completed = false;
    });
    if (completed) validateDishMaking(dish);
    return completed;
}

// Quand les ingrédients du plat sont tous entrés, ça part en cuisson
function validateDishMaking(dish) {
    dish.makingCompleted = true;
    const newScore = score + 5;
    updateScore(newScore);
    moveDishToCooking(dish);
    decreaseDishesCounter();
    dishesHasChanged();
}

// Quand la cuisson est finie et le plat envoyé
function validateDishCooking(dish) {

}

function removeDish(dish) {
    const dishDOM = document.querySelector(`[data-id="${dish.id}"]`);
    const dishIngredientsDOM = document.querySelectorAll(`[data-dish="${dish.id}"]`);
    dishesShowed.splice(dishesShowed.indexOf(dish), 1);
    for (let ingredient of dish.ingredients) {
        ingredientsShowed.splice(ingredientsShowed.indexOf(ingredient), 1);
    }
    document.querySelector('.dishes').removeChild(dishDOM);
    Array.from(dishIngredientsDOM).filter(ingredient => document.querySelector('.ingredients').removeChild(ingredient));
}

function moveDishToCooking(dish) {
    const dishDOM = document.querySelector(`[data-id="${dish.id}"]`);
    const dishIngredientsDOM = document.querySelectorAll(`[data-dish="${dish.id}"]`);
    dishesShowed.splice(dishesShowed.indexOf(dish), 1);
    for (let ingredient of dish.ingredients) {
        ingredientsShowed.splice(ingredientsShowed.indexOf(ingredient), 1);
    }
    document.querySelector('.cooking-dishes').appendChild(dishDOM);
    Array.from(dishIngredientsDOM).filter(ingredient => document.querySelector('.ingredients').removeChild(ingredient));
}

function updateScore(newScore) {
    score = newScore;
    document.querySelector('.score').innerHTML = newScore.toString();
}

function decreaseDishesCounter() {
    dishesCounter--;
}

function increaseDishesCounter() {
    dishesCounter++;
}

function decreaseDishesCursor() {
    dishesCursor--;
}

function increaseDishesCursor() {
    dishesCursor++;
}

function dishesHasChanged() {
    dishesChanged = true;
}

function dishesHasNotChanged() {
    dishesChanged = false;
}


export {
    score,
    timesUp,
    updateActiveDish,
    checkCompletedDishMaking,
    removeDish,
    updateScore,
    activeDish,
    dishesCursor,
    dishesCounter,
    dishesChanged,
    decreaseDishesCounter,
    increaseDishesCounter,
    decreaseDishesCursor,
    increaseDishesCursor,
    dishesHasChanged,
    dishesHasNotChanged,
};