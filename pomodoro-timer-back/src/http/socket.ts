import http from "http";
import { Server } from "socket.io";

import { JoinRoom, StartCounter, StopCounter } from "@common/Events";
import handlers from "@handlers/index";

const { joinRoomHandler, startCounterHandler, stopCounterHandler } = handlers;

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

    socket.on(StopCounter, (params) => {
      stopCounterHandler.execute(io, socket, params);
    });
  });

  return server;
}
