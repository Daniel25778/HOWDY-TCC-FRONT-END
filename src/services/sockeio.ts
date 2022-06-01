import { parseCookies } from "nookies";
import { io } from "socket.io-client";

const cookies = parseCookies();

const socket = io('http://10.107.144.8:3333');

//CONECTANDO-SE AO SOCKET.IO
socket.emit('authenticate', cookies['firebaseAccount']);

export default socket;