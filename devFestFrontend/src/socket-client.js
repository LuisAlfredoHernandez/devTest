import { io } from "socket.io-client";
const socket = io(
  "wss://ws.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:XBTUSD"
);

export default socket;
