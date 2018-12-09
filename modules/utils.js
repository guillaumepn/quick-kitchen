import {dishList, score} from "./base";

let activeDish = undefined;

function timesUp(timer) {
    return new Promise(resolve => {
        setTimeout(resolve, timer.duration * 1000);
    });
}

function prop_access(object, string) {
    let props = string.split('.');
    let res = object;
    props.map(prop => {
        res = res[prop]
    });
    return res || string
}

String.prototype.interpolate = function (object) {
    let prop = this
        .replace('{{', '')
        .replace('}}', '')
        .trim();

    return prop_access(object, prop);
};

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