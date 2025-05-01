import {
  Notification,
  NotificationType,
} from 'src/domain/entities/notification.entity'
import { NotificationFactory } from 'src/domain/factories/notification.factory'
export class SendNotificationUseCase {
  constructor(
    private readonly notificationFactoryAdapter: NotificationFactory,
  ) {}

  async execute(
    type: NotificationType,
    recipient: string,
    message: string,
    subject?: string,
  ) {
    const notification = new Notification(type, recipient, message, subject)
    const adapter = this.notificationFactoryAdapter.getAdapter(type)
    await adapter.send(notification)
  }
}
