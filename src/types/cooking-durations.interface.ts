import { CookingTime } from "./cooking-time.interface";
import { Food } from "./food.enum";

export interface CookingDurations {
  [Food.FISH]: CookingTime;
  [Food.TROPHY]: CookingTime;
  [Food.MEAT]: CookingTime;
  [Food.BEAST]: CookingTime;
}