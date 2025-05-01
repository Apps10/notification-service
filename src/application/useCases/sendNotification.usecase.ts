import {
  Notification,
  NotificationType,
} from 'src/domain/entities/notification.entity'
import { NotificationPort } from 'src/domain/ports/notification.port'

export class SendNotificationUseCase {
  constructor(private readonly notificationPort: NotificationPort) {}

  async execute(
    type: NotificationType,
    recipient: string,
    message: string,
    subject?: string,
  ) {
    const notification = new Notification(type, recipient, message, subject)
    await this.notificationPort.send(notification)
  }
}
