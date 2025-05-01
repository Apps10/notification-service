export type NotificationType = 'email' | 'push' | 'socket'
export enum NotificationTypeEnum {
  EMAIL = 'email',
  PUSH = 'push',
  SOCKET = 'socket',
}

export class Notification {
  constructor(
    public readonly type: NotificationType,
    public readonly recipient: string, //email o FCM token
    public readonly message: string,
    public readonly subject?: string, //solo para email
  ) {
    this.validate()
  }

  isEmail() {
    return this.type === 'email'
  }

  isPush() {
    return this.type === 'push'
  }

  isSocket() {
    return this.type === 'socket'
  }

  private validate(): void {
    if (!this.type || !['email', 'push', 'socket'].includes(this.type)) {
      throw new Error('Invalid notification type')
    }
    if (!this.recipient) {
      throw new Error('Recipient is required')
    }
    if (!this.message) {
      throw new Error('Message is required')
    }
    if (this.isEmail() && !this.subject) {
      throw new Error('Subject is required for email notifications')
    }
  }
}
