import { credential, messaging, app, initializeApp } from 'firebase-admin'
import { Notification } from 'src/domain/entities/notification.entity'
import { NotificationPort } from 'src/domain/ports/notification.port'
import { FIREBASE_CREDENTIALS_PATH } from '../../../shared/env/envs'

export class FirebaseNotificationAdapter implements NotificationPort {
  constructor() {
    if (!app.length) {
      initializeApp({
        credential: credential.cert(FIREBASE_CREDENTIALS_PATH),
      })
    }
  }

  async send(notification: Notification): Promise<void> {
    if (!notification.isPush()) {
      throw new Error('This adapter only support email notification')
    }

    const message: messaging.Message = {
      token: notification.recipient,
      notification: {
        title: 'NotifyX',
        body: notification.message,
      },
    }

    await messaging().send(message)
  }
}
