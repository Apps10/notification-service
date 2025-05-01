import { io } from 'socket.io-client'

const serverUrl = `http://localhost:3000`
const socket = io(serverUrl)

console.log(`Escuchando eventos del servidor ${serverUrl}`)

socket.on('notification', (data) => {
  console.log('Notificación recibida:', data)
})
