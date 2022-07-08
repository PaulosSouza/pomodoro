import { Type } from "@modules/Pomodoro";

export interface IStartCounterDTO {
  counter: number;
  roomId: string;
  type: Type;
}
