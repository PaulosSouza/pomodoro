import { Pomodoro } from "./Pomodoro";

const pomodoros = [] as Pomodoro[];

class CounterPomodoro {
  private static instance: CounterPomodoro;

  public static getInstance(): CounterPomodoro {
    if (!CounterPomodoro.instance) {
      CounterPomodoro.instance = new CounterPomodoro();
    }

    return CounterPomodoro.instance;
  }

  push(pomodoro: Pomodoro): Pomodoro {
    const pomoAlreadyExists = pomodoros.find(() => pomodoro.id === pomodoro.id);

    if (pomoAlreadyExists) {
      return pomoAlreadyExists;
    }

    pomodoros.push(pomodoro);

    return pomodoro;
  }

  findById(id: string): Pomodoro | undefined {
    return pomodoros.find((pomo) => pomo.id === id);
  }
}

export { CounterPomodoro };
