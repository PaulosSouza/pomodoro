import http from "http";
import { Server } from "socket.io";

import { StartCounter } from "@common/Events";
import { StartCounterHandle } from "@handles/index";

const startCounterHandle = new StartCounterHandle();

export function socket(app: Express.Application) {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on(StartCounter, (params) =>
      startCounterHandle.execute(socket, params)
    );
  });

  return server;
}
