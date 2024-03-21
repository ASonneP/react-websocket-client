import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { WebsocketProvider, socket } from "./contexts/WebSocketContext";
import { Websocket } from "./components/WebSocket";

function App() {
  return (
    <WebsocketProvider value={socket}>
      <Websocket />
    </WebsocketProvider>
  );
}

export default App;
