import { Condition } from "./types/condition.enum";
import { CookingDurations } from "./types/cooking-durations.interface";
import { Food } from "./types/food.enum";
const cookingDuration: CookingDurations = require(__dirname + '/../static/cooking-times.json');

let interval: NodeJS.Timeout | undefined;
let currentTime = 0
const intervalTime = 100;

export function startTimer(food: Food, listener: (condition: Condition, currentTimeMS: number) => void): void {
  stopTimer();
  const times = { ...cookingDuration[food] };
  times.underCooked = times.underCooked * 1000;
  times.cooked = times.cooked * 1000;
  times.burnt = times.burnt * 1000;
  interval = setInterval(() => {
    currentTime += intervalTime;

    let condition = Condition.RAW;
    if (currentTime >= times.burnt) {
      condition = Condition.BURNT;
    } else if (currentTime >= times.cooked) {
      condition = Condition.COOKED;
    } else if (currentTime >= times.underCooked) {
      condition = Condition.UNDER_COOKED;
    }
    listener(condition, currentTime);

  }, intervalTime);
}

export function stopTimer(): void {
  if (interval) {
    clearInterval(interval);
    interval = undefined;
    currentTime = 0;
  }
}