export interface NotificationPort {
  send(notification: Notification): Promise<void>
}
