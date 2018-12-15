import {dishesShowed, ingredientsShowed, score} from "./base";

let activeDish = undefined;

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
        res = res[prop]
    });
    return res || string
}

function updateActiveDish(dish) {
    activeDish = dish;
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

function updateScore(score) {
    document.querySelector('.score').innerHTML = score.toString();
}


export {
    timesUp,
    updateActiveDish,
    removeDish,
    updateScore,
    activeDish
};