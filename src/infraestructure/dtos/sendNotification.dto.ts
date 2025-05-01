import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import {
  NotificationType,
  NotificationTypeEnum,
} from 'src/domain/entities/notification.entity'

export class SendNotificationDto {
  @IsEnum(NotificationTypeEnum)
  type: NotificationType

  @IsString()
  @IsEnum(['email', 'FCM Token'], {
    message: 'invalid recipent, only support "email" and "FCM Token"',
  })
  @IsNotEmpty()
  recipient: string //email o FCM token

  @IsString()
  @IsNotEmpty()
  message: string

  @IsString()
  subject?: string
}
