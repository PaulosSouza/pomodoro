import http from "http";
import { Server } from "socket.io";

import { JoinRoom, StartCounter } from "@common/Events";
import { StartCounterHandler, JoinRoomHandler } from "@handlers/index";

const startCounterHandler = new StartCounterHandler();
const joinRoomHandler = new JoinRoomHandler();

export function socket(app: Express.Application) {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on(StartCounter, (params) =>
      startCounterHandler.execute(io, socket, params)
    );

    socket.on(JoinRoom, (params) =>
      joinRoomHandler.execute(io, socket, params)
    );
  });

  return server;
}
