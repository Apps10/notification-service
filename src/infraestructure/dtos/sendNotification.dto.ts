import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import {
  NotificationType,
  NotificationTypeEnum,
} from 'src/domain/entities/notification.entity'

export class SendNotificationDto {
  @IsEnum(NotificationTypeEnum)
  @IsNotEmpty()
  type: NotificationType

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o: SendNotificationDto) => ['email', 'push'].includes(o.type))
  recipient: string //email o FCM token

  @IsString()
  @IsNotEmpty()
  message: string

  @ValidateIf((o: SendNotificationDto) => o.type === 'email')
  @IsString()
  subject?: string
}
