import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const socket = new WebSocket('wss://ws.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:XBTUSD');
    socket.onopen = () => console.log('Conectado al servidor de WebSocket');

    // socket.onmessage = ({data}) => {
    //   console.log('Mensaje recibido:', data);
    // }

   }, []);
  
  return (
    <>
      Holaa!!
    </>
  )
}

export default App
