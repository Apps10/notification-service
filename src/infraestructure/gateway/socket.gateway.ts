import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway implements OnGatewayInit {
  @WebSocketServer() server: Server

  // Método que se llama cuando el Gateway se inicializa
  afterInit() {
    console.log('WebSocket Gateway Initialized')
  }

  // Método para emitir una notificación a todos los clientes
  sendNotification(message: string): void {
    try {
      this.server.emit('notification', message) // Emite el mensaje a todos los clientes conectados
    } catch (error) {
      console.error('Error al enviar la notificación:', error)
      throw new Error('Error al intentar emitir una notificacion por socket')
    }
  }
}
