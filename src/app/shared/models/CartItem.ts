import { Food } from './Food';

export class CartItem {
  constructor(public food: Food) {}

  count: number = 1;
  price: number = this.food.price;
}
