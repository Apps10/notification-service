import * as app from 'firebase-admin'
import { Notification } from 'src/domain/entities/notification.entity'
import { NotificationPort } from 'src/domain/ports/notification.port'
import { FIREBASE_CREDENTIALS } from '../../../shared/env/envs'

export class FirebaseNotificationAdapter implements NotificationPort {
  constructor() {
    if (!app.apps.length) {
      const firebaseCredentials = JSON.parse(FIREBASE_CREDENTIALS)

      app.initializeApp({
        credential: app.credential.cert(firebaseCredentials),
      })
    }
  }

  async send(notification: Notification): Promise<void> {
    if (!notification.isPush()) {
      throw new Error('This adapter only supports push notifications')
    }

    const message: app.messaging.Message = {
      token: notification.recipient,
      notification: {
        title: 'NotifyX',
        body: notification.message,
      },
    }

    try {
      await app.messaging().send(message)
      console.log('Notificación enviada correctamente')
    } catch (error) {
      console.error('Error al enviar la notificación:', error)
      throw new Error('Error al enviar la notificación push')
    }
  }
}
