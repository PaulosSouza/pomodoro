import { Server, Socket } from "socket.io";
import { Message } from "@common/Emiters";
import { IResponseDTO } from "@dtos/default/IResponseDTO";
import { IStopCounterDTO } from "@dtos/IStopCounterDTO";
import { CounterPomodoro } from "@modules/CounterPomodoros";

class StopCounterHandler {
  private pomoCounter: CounterPomodoro;

  constructor() {
    this.pomoCounter = new CounterPomodoro();
  }

  execute(io: Server, socket: Socket, { roomId }: IStopCounterDTO) {
    const pomodoro = this.pomoCounter.findById(roomId);

    if (!pomodoro) {
      socket.emit(Message, {
        success: false,
        message: `Pomodoro not found`,
      } as IResponseDTO);
      return;
    }

    if (!pomodoro.isRunning) {
      socket.emit(Message, {
        success: false,
        message: `Pomodoro already stopped!`,
      } as IResponseDTO);
      return;
    }

    pomodoro.stop();

    io.to(roomId).emit(Message, {
      success: true,
      message: `Pomodoro stop!`,
    } as IResponseDTO);
  }
}

export default StopCounterHandler;
