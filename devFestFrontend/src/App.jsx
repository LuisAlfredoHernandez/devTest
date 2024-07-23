import { useEffect } from 'react'
import './App.css'
import socket from './socket-client'

function App() {

  useEffect(() => {
    socket.on('connected', (msg) => {
      console.log(msg, "Coneccion establecida");
    });
    return () => {
      socket.off('message');
    };
  }, []);
  
  return (
    <>
      Holaa!!
    </>
  )
}

export default App
