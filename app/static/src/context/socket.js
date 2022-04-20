import React from "react";
import io from "socket.io-client";

var sensorEndpoint = `http://${process.env.REACT_APP_URL}`;
export const socket = io.connect(sensorEndpoint, {
  reconnection: true,
});
export const SocketContext = React.createContext();
