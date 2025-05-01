import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import {
  NotificationType,
  NotificationTypeEnum,
} from 'src/domain/entities/notification.entity'

export class SendNotificationDto {
  @IsEnum(NotificationTypeEnum)
  type: NotificationType

  @IsString()
  @IsNotEmpty()
  recipient: string //email o FCM token

  @IsString()
  @IsNotEmpty()
  message: string

  @IsString()
  subject?: string
}
