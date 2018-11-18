import Ingredient from '../ingredient';

export default class Tomate extends Ingredient {
    constructor(id, name, letter = 'T', required, order) {
        super(id, name, letter, required, order);
    }

    display() {
        return `${this.id} ${this.name}`;
    }
};