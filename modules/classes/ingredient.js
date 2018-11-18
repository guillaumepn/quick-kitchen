export default class Ingredient {
    constructor(id, name, letter, required, order) {
        this._id = id;
        this._name = name;
        this._letter = letter;
        this._required = required;
        this._order = order;
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

    get letter() {
        return this._letter;
    }

    set letter(value) {
        this._letter = value;
    }

    get required() {
        return this._required;
    }

    set required(value) {
        this._required = value;
    }

    get order() {
        return this._order;
    }

    set order(value) {
        this._order = value;
    }
}