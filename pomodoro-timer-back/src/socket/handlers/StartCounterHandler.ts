import { Server, Socket } from "socket.io";
import { Counter } from "@common/Emiters";
import { ICounterDTO } from "@dtos/ICounterDTO";
import { IStartCounterDTO } from "@dtos/IStartCounterDTO";
import { CounterPomodoro } from "@modules/CounterPomodoros";
import { Pomodoro } from "@modules/Pomodoro";

class StartCounterHandler {
  private pomoCounter: CounterPomodoro;

  constructor() {
    this.pomoCounter = new CounterPomodoro();
  }

  execute(
    io: Server,
    _: Socket,
    { counter, type, roomId }: IStartCounterDTO
  ): void {
    const pomoActive = this.pomoCounter.findById(roomId);

    if (pomoActive?.isRunning) {
      return;
    }

    const emitCounter = (params: ICounterDTO) =>
      io.to(roomId).emit(Counter, params);

    if (pomoActive && !pomoActive.isRunning) {
      pomoActive.start({
        io: emitCounter,
        roomId,
        counter,
        type,
      });

      return;
    }

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
