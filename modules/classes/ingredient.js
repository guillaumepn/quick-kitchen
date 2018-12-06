export default class Ingredient {
    constructor(id, name, letter, dish, validated, order) {
        this._id = id;
        this._name = name;
        this._letter = letter;
        this._dish = dish;
        this._validated = validated;
        this._order = order;
    }

    html() {
        let html = document.createElement('div');
        html.classList.add('ingredient');
        return html;
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

    get dish() {
        return this._dish;
    }

    set dish(value) {
        this._dish = value;
    }

    get letter() {
        return this._letter;
    }

    set letter(value) {
        this._letter = value;
    }

    get validated() {
        return this._validated;
    }

    set validated(value) {
        this._validated = value;
    }

    get order() {
        return this._order;
    }

    set order(value) {
        this._order = value;
    }
}