import { io } from 'socket.io-client'

const socket = io(`http://localhost:3000`)

socket.on('notification', (data) => {
  console.log('Notificación recibida:', data)
})
