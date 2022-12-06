import { Food } from '../models/Food';

export interface IFoodResults {
  items: Food[];
  total: number;
  slice: {
    start: number;
    count: number;
  };
}
