import { io } from "socket.io-client";

const socket = new WebSocket(
  "ws://localhost:5173/ws?subscribe=instrument,orderBookL2_25:XBTUSD"
);

export default socket;
