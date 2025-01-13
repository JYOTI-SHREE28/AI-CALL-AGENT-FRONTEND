import { io } from 'socket.io-client';
const API_URL=import.meta.env.VITE_API_URL;
const socket = io(API_URL, {
  autoConnect: true,
  reconnection: true,
  transports: ['polling', 'websocket'], // Force polling first
  upgrade: true,
  rememberUpgrade: true,
  timeout: 20000,
  path: '/socket.io/'
});

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

export const joinCall = (callId) => {
  socket.emit('joinCall', callId);
};

export const sendMessage = (callId, message, speaker) => {
  socket.emit('customerMessage', { callId, message, speaker });
};

export default socket;