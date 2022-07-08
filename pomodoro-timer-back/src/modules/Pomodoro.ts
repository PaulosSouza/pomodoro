import { ICounterDTO } from "../dtos/ICounterDTO";

export type Type = "WORK" | "REST" | "LONG_REST";

class Pomodoro {
  public counter = 0;

  public type: Type = "WORK";

  public id: string;

  public isRunning: boolean;

  private setInterval: NodeJS.Timer;

  constructor(id: string) {
    this.id = id;
    this.isRunning = false;
    this.setInterval = setInterval(() => [], 0);
  }

  start({
    io,
    type = this.type,
    counter = this.counter,
  }: {
    io: (params: ICounterDTO) => void;
    roomId: string;
    type: Type;
    counter: number;
  }) {
    if (!this.isRunning) {
      this.counter = counter;
      this.type = type;
    }

    this.setInterval = setInterval(() => {
      const counter = this.counter--;

      io({ type, counter });

      if (counter === 0) {
        this.stop();
        return;
      }

      this.isRunning = true;
    }, 1000);

    return;
  }

  stop() {
    this.isRunning = false;

    clearInterval(this.setInterval);
  }
}

export { Pomodoro };
