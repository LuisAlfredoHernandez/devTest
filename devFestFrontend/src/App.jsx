import { useEffect } from "react";
import "./App.css";
import InstrumentsTable from "./components/InstrumentsTable";
import { useState } from "react";
import HistoricTransactionTable from "./components/HistoricTransactionsTable";
import Title from "./components/Titles";
import { saveInstrumentsToDB, saveOrderBooksToDB } from "./services";

function App() {
  const [transactionData, setTransactionData] = useState([]);
  const [instrumentsData, setInstrumentsData] = useState([]);

  const updateTransactionData = (transactions) => {
    setTransactionData(transactions);
    saveOrderBooksToDB(transactions);
  };

  const updateInstrumentsData = (instruments) => {
    setInstrumentsData(instruments);
    saveInstrumentsToDB(instruments);
  };

  const socketSetup = () => {
    const socket = new WebSocket(
      "wss://ws.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:XBT"
    );
    socket.onmessage = function (response) {
      const parsedResponse = JSON.parse(response.data);
      if ("table" in parsedResponse) {
        if (
          parsedResponse.table === "instrument" &&
          parsedResponse.data.length > 10
        )
          updateInstrumentsData(parsedResponse);
        else if (
          parsedResponse.table === "orderBookL2_25" &&
          parsedResponse.data.length > 10
        )
          updateTransactionData(parsedResponse);
      }
      setTimeout(() => {
        socket.close();
      }, 1000);
    };
  };

  useEffect(() => {
    socketSetup();
  }, []);

  return (
    <>
      <Title text={"''WHAT'S ON THE MARKET?!!''"} />
      <InstrumentsTable
        setData={setInstrumentsData}
        instruments={instrumentsData}
      />
      <p className="font-mono text-lg mt-5">
        Aqui puede observar los valores ofrecidos en el mercado en tiempo real.
        <br />
        Desde su cotizacion actual hasta su comparacion a como se cotizaba en
        las ultimas 24 horas.
      </p>

      <Title text={"REAL TIME TRANSACTIONS"} />
      <HistoricTransactionTable
        setData={setTransactionData}
        transactions={transactionData}
      />
    </>
  );
}

export default App;
