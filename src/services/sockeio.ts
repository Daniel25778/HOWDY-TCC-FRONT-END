import { parseCookies } from "nookies";
import { io } from "socket.io-client";

const cookies = parseCookies();

const socket = io('http://localhost:3333');

//CONECTANDO-SE AO SOCKET.IO
socket.emit('authenticate', cookies['firebaseAccount']);

export default socket;