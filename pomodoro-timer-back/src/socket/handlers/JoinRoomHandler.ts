import { Server, Socket } from "socket.io";
import { Message } from "@common/Emiters";
import { IResponseDTO } from "@dtos/default/IResponseDTO";
import { IJoinRoomDTO } from "@dtos/IJoinRoomDTO";

class JoinRoomHandler {
  async execute(io: Server, socket: Socket, { roomId }: IJoinRoomDTO) {
    const isRoomExist = socket.rooms.has(roomId);

    if (!isRoomExist) {
      socket.rooms.add(roomId);
    }

    await socket.join(roomId);

    socket.broadcast.to(roomId).emit(Message, {
      success: true,
      message: "New device connected",
    } as IResponseDTO);

    socket.emit(Message, {
      success: true,
      message: "Device connected sucessufuly",
    } as IResponseDTO);
  }
}

export default JoinRoomHandler;
