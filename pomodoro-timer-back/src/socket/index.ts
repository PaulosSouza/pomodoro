import JoinRoomHandler from "./handlers/JoinRoomHandler";
import StartCounterHandler from "./handlers/StartCounterHandler";
import StopCounterHandler from "./handlers/StopCounterHandler";

export default {
  startCounterHandler: new StartCounterHandler(),
  joinRoomHandler: new JoinRoomHandler(),
  stopCounterHandler: new StopCounterHandler(),
};
