
import { CookingDurations } from "./types/cooking-durations.interface";
import { CookingTime } from "./types/cooking-time.interface";
import { Food } from "./types/food.enum";
const cookingDuration: CookingDurations = require(__dirname + '/../static/cooking-times.json');

export function getCookingTimes(food: Food): CookingTime {
  const times: CookingTime = { ...cookingDuration[food] };
  times.underCooked = times.underCooked * 1000;
  times.cooked = times.cooked * 1000;
  times.burnt = times.burnt * 1000;
  return times;
}