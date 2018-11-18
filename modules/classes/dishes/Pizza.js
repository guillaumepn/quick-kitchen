import Dish from '../dish';

export default class Pizza extends Dish {
    constructor(id, name, timer, ingredients, waitingDuration, cookingDuration, beforeBurnt) {
        super(id, name, timer, ingredients, waitingDuration, cookingDuration, beforeBurnt);
    }
}