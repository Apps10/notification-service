import { Notification } from '../entities/notification.entity'

export interface NotificationPort {
  send(notification: Notification): Promise<void>
}
