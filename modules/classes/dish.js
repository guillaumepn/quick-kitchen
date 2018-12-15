export default class Dish {
    constructor(id, name, timer = null, ingredients = [], showed, waitingDuration, cookingDuration, beforeBurnt, active, makingCompleted = false, cookingCompleted = false) {
        this._id = id;
        this._name = name;
        this._ingredients = ingredients;
        this._waitingDuration = waitingDuration;
        this._cookingDuration = cookingDuration;
        this._beforeBurnt = beforeBurnt;
        this._timer = timer;
        this._active = active;
        this._showed = showed;
        this._makingCompleted = makingCompleted;
        this._cookingCompleted = cookingCompleted;
    }

    html() {
        let html = document.createElement('div');
        html.classList.add('dish');
        html.dataset.id = this.id;
        return html;
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

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }

    get showed() {
        return this._showed;
    }

    set showed(value) {
        this._showed = value;
    }

    get makingCompleted() {
        return this._makingCompleted;
    }

    set makingCompleted(value) {
        this._makingCompleted = value;
    }

    get cookingCompleted() {
        return this._cookingCompleted;
    }

    set cookingCompleted(value) {
        this._cookingCompleted = value;
    }
}