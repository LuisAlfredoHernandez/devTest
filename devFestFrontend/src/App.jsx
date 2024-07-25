import { useEffect } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import { useState } from "react";

function App() {
  const [transactionData, setTransactionData] = useState([]);
  const [instrumentsData, setInstrumentsData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://ws.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:XBT"
    );
    socket.onopen = () => console.log("Conectado al servidor de WebSocket");

    socket.onmessage = function (response) {
      const parsedResponse = JSON.parse(response.data);
      console.log(parsedResponse);
      if ("table" in parsedResponse) {
        if (
          parsedResponse.table === "instrument" &&
          parsedResponse.data.length > 10
        )
          setInstrumentsData(parsedResponse);
        else if (parsedResponse.table === "orderBookL2_25")
          setTransactionData(parsedResponse);
      }

      setTimeout(() => {
        console.log("Cerrando la conexión WebSocket después de 5 segundos.");
        socket.close();
      }, 1000);
    };
  }, []);

  return (
    <>
      <div className="parent-container">
        <MainPage instruments={instrumentsData} />
      </div>
    </>
  );
}

export default App;
