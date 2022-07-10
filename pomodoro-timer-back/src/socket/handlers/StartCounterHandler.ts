import { Server, Socket } from "socket.io";
import { Counter, Message } from "@common/Emiters";
import { IResponseDTO } from "@dtos/default/IResponseDTO";
import { ICounterDTO } from "@dtos/ICounterDTO";
import { IStartCounterDTO } from "@dtos/IStartCounterDTO";
import { ICounterResponse } from "@dtos/response/ICounterResponseDTO";
import { CounterPomodoro } from "@modules/CounterPomodoros";
import { Pomodoro } from "@modules/Pomodoro";

class StartCounterHandler {
  private pomoCounter: CounterPomodoro;

  constructor() {
    this.pomoCounter = new CounterPomodoro();
  }

  execute(
    io: Server,
    socket: Socket,
    { counter, type, roomId }: IStartCounterDTO
  ): void {
    const pomoActive = this.pomoCounter.findById(roomId);

    if (pomoActive?.isRunning) {
      socket.emit(Message, {
        success: false,
        message: "Pomodoro already started",
      } as IResponseDTO);
      return;
    }

    const emitCounter = ({ counter, type }: ICounterDTO) =>
      io.in(roomId).emit(Counter, {
        success: true,
        message: `Pomodoro's ${type} started`,
        data: {
          type,
          counter,
        },
      } as ICounterResponse);

    const pomodoro = new Pomodoro(roomId);
    pomodoro.start({
      io: emitCounter,
      roomId,
      type,
      counter,
    });

    this.pomoCounter.push(pomodoro);
  }
}

export default StartCounterHandler;
