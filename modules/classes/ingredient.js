export default class Ingredient {
    constructor(id, name, letter, dish, validated, showed, active, order) {
        this._id = id;
        this._name = name;
        this._letter = letter;
        this._dish = dish;
        this._validated = validated;
        this._order = order;
        this._active = active;
        this._showed = showed;
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


    get order() {
        return this._order;
    }

    set order(value) {
        this._order = value;
    }
}