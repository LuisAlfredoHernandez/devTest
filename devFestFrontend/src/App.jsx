import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const socket = new WebSocket(
      "wss://ws.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:XBT"
    );
    socket.onopen = () => console.log("Conectado al servidor de WebSocket");

    socket.onmessage = function (response) {
      const parsedResponse = JSON.parse(response.data);
      "table" in parsedResponse
        ? console.log("Received data:", parsedResponse)
        : null;

      setTimeout(() => {
        console.log("Cerrando la conexión WebSocket después de 5 segundos.");
        socket.close();
      }, 2000);
    };
  }, []);

  return <>Holaa!!</>;
}

export default App;
