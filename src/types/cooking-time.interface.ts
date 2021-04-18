import { Condition } from "./condition.enum";

export interface CookingTime {
  [Condition.UNDER_COOKED]: number;
  [Condition.COOKED]: number;
  [Condition.BURNT]: number;
}