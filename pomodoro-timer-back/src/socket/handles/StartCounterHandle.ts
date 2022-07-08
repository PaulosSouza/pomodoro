import { Socket } from "socket.io";
import { Counter } from "@common/Emiters";
import { ICounterDTO, IStartCounterDTO } from "@dtos/index";
import { CounterPomodoro } from "@modules/CounterPomodoros";
import { Pomodoro } from "@modules/Pomodoro";

class StartCounterHandle {
  private pomoCounter: CounterPomodoro;

  constructor() {
    this.pomoCounter = new CounterPomodoro();
  }

  execute(socket: Socket, { counter, type, roomId }: IStartCounterDTO): void {
    const pomoActive = this.pomoCounter.findById(roomId);

    if (pomoActive?.isRunning) {
      return;
    }

    const emitCounter = (params: ICounterDTO) =>
      socket.in(roomId).emit(Counter, params);

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

export default StartCounterHandle;
