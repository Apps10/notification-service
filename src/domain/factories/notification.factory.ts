import { NotificationType } from '../entities/notification.entity'
import { NotificationPort } from '../ports/notification.port'

export interface NotificationFactory {
  getAdapter(type: NotificationType): NotificationPort
}
