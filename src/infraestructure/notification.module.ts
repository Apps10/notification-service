import { Module } from '@nestjs/common'
import { SendNotificationUseCase } from 'src/application/useCases/sendNotification.usecase'
import { NotificationFactoryImp } from './factories/notificationImp.factory'
import { EmailNotificationAdapter } from './adapters/email/email-notification.adapter'
import { FirebaseNotificationAdapter } from './adapters/push/firebase-notification.adapter'
import { NotificationController } from './controller/notification.controller'

@Module({
  controllers: [NotificationController],
  providers: [
    EmailNotificationAdapter,
    FirebaseNotificationAdapter,
    NotificationFactoryImp,
    {
      provide: SendNotificationUseCase,
      useFactory: (
        emailAdapter: EmailNotificationAdapter,
        pushAdapter: FirebaseNotificationAdapter,
      ) =>
        new SendNotificationUseCase(
          new NotificationFactoryImp(emailAdapter, pushAdapter),
        ),
      inject: [EmailNotificationAdapter, FirebaseNotificationAdapter],
    },
  ],
})
export class NotificationModule {}
