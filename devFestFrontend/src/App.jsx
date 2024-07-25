import { useEffect } from "react";
import "./App.css";
import InstrumentsTable from "./components/InstrumentsTable";
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
        <div className="h-0">
          <h1 className="mt-10 text-center font-mono:hover">
            {"''WHAT'S ON THE MARKET?!!''"}
          </h1>
        </div>
        <InstrumentsTable instruments={instrumentsData} />
        <p className="font-mono text-lg	">
          Aqui puede observar los valores ofrecidos en el mercado en tiempo
          real.
          <br />
          Desde su cotizacion actual hasta su comparacion a como se cotizaba en
          las ultimas 24 horas.
        </p>
      </div>
    </>
  );
}

export default App;
