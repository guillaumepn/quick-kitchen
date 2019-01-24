import {dishesShowed, history, ingredientsShowed, nextlevel, topSection} from "./base";

let activeDish = undefined;
let score = 0;
let dishesCursor = 0;
let dishesCounter = 0;
let dishesChanged = false;
let levelDishValidatedCounter = 0;
let levelEnded = false;
let failedDish = 0;
let successDish = 0;

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

function endLevel() {
    if (!levelEnded) {
        levelEnded = true;
        afterLevel();
    }
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
    increaseSucessDish();
    levelDishValidatedCounter--;
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
    dishDOM.removeChild(dishDOM.lastChild);
    Array.from(dishIngredientsDOM).filter(ingredient => document.querySelector('.ingredients').removeChild(ingredient));
}

function updateScore(newScore) {
    score = newScore;
    document.querySelector('.score').innerHTML = newScore.toString();
}

function afterLevel() {
    if (levelEnded === true) {
        // topSection.append(nextlevel);
        topSection.append(history);
    }
}

function decreaseDishesCounter() {
    dishesCounter--;
    console.log(dishesCounter)
}

function increaseDishesCounter() {
    dishesCounter++;
}

function decreaseDishesCursor() {
    dishesCursor--;
}

function increaseSucessDish() {
    successDish++;
}

function increaseFailedDish() {
    failedDish++;
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

function type_check(val, conf) {
    return (conf.type ? typeof val === conf.type : true)
        && (conf.value ? val === conf.value : true)
        && (conf.enum ? conf.enum.includes(val) : true)
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
    increaseFailedDish,
    increaseSucessDish,
    failedDish,
    successDish,
    increaseDishesCursor,
    dishesHasChanged,
    dishesHasNotChanged,
    levelDishValidatedCounter,
    levelEnded,
    endLevel
};