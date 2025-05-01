import { Body, Controller, Post } from '@nestjs/common'
import { SendNotificationUseCase } from 'src/application/useCases/sendNotification.usecase'
import { SendNotificationDto } from '../dtos/sendNotification.dto'

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  @Post('')
  async run(@Body() dto: SendNotificationDto) {
    await this.sendNotificationUseCase.execute(
      dto.type,
      dto.recipient,
      dto.message,
      dto.subject,
    )

    return {
      status: 'success',
      message: 'Notification sended succesfully',
    }
  }
}
