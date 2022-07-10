import { IResponseDTO } from "@dtos/default/IResponseDTO";
import { Type } from "@modules/Pomodoro";

export interface ICounterResponse extends IResponseDTO {
  data: {
    counter: number;
    type: Type;
  };
}
