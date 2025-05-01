import { Module } from '@nestjs/common'
import { SendNotificationUseCase } from 'src/application/useCases/sendNotification.usecase'
import { NotificationFactoryImp } from './factories/notificationImp.factory'
import { NotificationFactory } from 'src/domain/factories/notification.factory'
import { EmailNotificationAdapter } from './adapters/email/email-notification.adapter'
import { FirebaseNotificationAdapter } from './adapters/push/firebase-notification.adapter'
import { NotificationController } from './controller/notification.controller'

@Module({
  controllers: [NotificationController],
  providers: [
    EmailNotificationAdapter,
    FirebaseNotificationAdapter,
    {
      provide: SendNotificationUseCase,
      useFactory: (notificationAdapterFactory: NotificationFactory) =>
        new SendNotificationUseCase(notificationAdapterFactory),
      inject: [NotificationFactoryImp],
    },
  ],
  exports: [NotificationController],
})
export class NotificationModule {}
