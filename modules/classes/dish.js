export default class Dish {
    constructor(id, name, timer, ingredients = [], waitingDuration, cookingDuration, beforeBurnt) {
        this._id = id;
        this._name = name;
        this._ingredients = ingredients;
        this._waitingDuration = waitingDuration;
        this._cookingDuration = cookingDuration;
        this._beforeBurnt = beforeBurnt;
        this._timer = timer;
    }

    html() {
        return `<div>${this._name}</div>`;
    }

    addIngredient(ingredient) {
        this._ingredients.push(ingredient);
    }

    showIngredients() {
        return this._ingredients;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get timer() {
        return this._timer;
    }

    set timer(value) {
        this._timer = value;
    }

    get ingredients() {
        return this._ingredients;
    }

    set ingredients(value) {
        this._ingredients = value;
    }

    get waitingDuration() {
        return this._waitingDuration;
    }

    set waitingDuration(value) {
        this._waitingDuration = value;
    }

    get cookingDuration() {
        return this._cookingDuration;
    }

    set cookingDuration(value) {
        this._cookingDuration = value;
    }

    get beforeBurnt() {
        return this._beforeBurnt;
    }

    set beforeBurnt(value) {
        this._beforeBurnt = value;
    }
}