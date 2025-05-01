import { NotificationType } from 'src/domain/entities/notification.entity'
import { NotificationFactory } from 'src/domain/factories/notification.factory'
import { NotificationPort } from 'src/domain/ports/notification.port'
import { EmailNotificationAdapter } from '../adapters/email/email-notification.adapter'
import { FirebaseNotificationAdapter } from '../adapters/push/firebase-notification.adapter'
import { SocketNotificationAdapter } from '../adapters/socket/socket-notification.adapter'

export class NotificationFactoryImp implements NotificationFactory {
  constructor(
    private readonly emailAdapter: EmailNotificationAdapter,
    private readonly pushAdapter: FirebaseNotificationAdapter,
    private readonly socketAdapter: SocketNotificationAdapter,
  ) {}

  getAdapter(type: NotificationType): NotificationPort {
    switch (type) {
      case 'email':
        return this.emailAdapter
      case 'push':
        return this.pushAdapter
      case 'socket':
        return this.socketAdapter
    }
  }
}
