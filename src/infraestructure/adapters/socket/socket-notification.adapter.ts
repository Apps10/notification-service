import { Notification } from 'src/domain/entities/notification.entity'
import { NotificationPort } from 'src/domain/ports/notification.port'
import { NotificationGateway } from 'src/infraestructure/gateway/socket.gateway'

export class SocketNotificationAdapter implements NotificationPort {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  async send(notification: Notification): Promise<void> {
    if (!notification.isSocket()) {
      throw new Error('This adapter only supports socket notifications')
    }
    this.notificationGateway.sendNotification(notification.message)
    return Promise.resolve()
  }
}
