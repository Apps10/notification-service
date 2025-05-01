import * as nodemailer from 'nodemailer'
import { NotificationPort } from 'src/domain/ports/notification.port'
import {
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USER,
} from '../../../shared/env/envs'
import { Notification } from 'src/domain/entities/notification.entity'

export class EmailNotificationAdapter implements NotificationPort {
  private instance = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    // auth: {
    //   user: MAIL_USER,
    //   pass: MAIL_PASSWORD,
    // },
  })

  async send(notification: Notification): Promise<void> {
    if (!notification.isEmail()) {
      throw new Error('This adapter only support email notification')
    }

    await this.instance.sendMail({
      from: `"NotifyX" <${MAIL_USER}>`,
      to: notification.recipient,
      subject: notification.subject,
      text: notification.message,
    })
  }
}
