import {typeCheck} from "../utils";

export default class Dish {
    constructor(id, name, timer = null, ingredients = [], showed, waitingDuration, cookingDuration, beforeBurnt, active, makingCompleted = false, cookingCompleted = false) {
        this._id = typeCheck(id, {type: 'string'}) && id;
        this._name = typeCheck(name, {type: 'string'}) && name;
        this._ingredients = typeCheck(ingredients, {type: 'object'}) && ingredients;
        this._waitingDuration = typeCheck(waitingDuration, {type: 'number'}) && waitingDuration;
        this._cookingDuration = typeCheck(cookingDuration, {type: 'number'}) && cookingDuration;
        this._beforeBurnt = typeCheck(beforeBurnt, {type: 'number'}) && beforeBurnt;
        this._timer = typeCheck(timer, {type: 'number'}) && timer;
        this._active = typeCheck(active, {type: 'boolean'}) && active;
        this._showed = typeCheck(showed, {type: 'boolean'}) && showed;
        this._makingCompleted = typeCheck(makingCompleted, {type: 'boolean'}) && makingCompleted;
        this._cookingCompleted = typeCheck(cookingCompleted, {type: 'boolean'}) && cookingCompleted;
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