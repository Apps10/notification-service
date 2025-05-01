import { Module } from '@nestjs/common'
import { SendNotificationUseCase } from 'src/application/useCases/sendNotification.usecase'
import { NotificationFactoryImp } from './factories/notificationImp.factory'
import { EmailNotificationAdapter } from './adapters/email/email-notification.adapter'
import { FirebaseNotificationAdapter } from './adapters/push/firebase-notification.adapter'
import { NotificationController } from './controller/notification.controller'
import { SocketNotificationAdapter } from './adapters/socket/socket-notification.adapter'
import { NotificationGateway } from './gateway/socket.gateway'

@Module({
  controllers: [NotificationController],
  providers: [
    EmailNotificationAdapter,
    FirebaseNotificationAdapter,
    NotificationFactoryImp,
    SocketNotificationAdapter,
    NotificationGateway,
    {
      provide: SocketNotificationAdapter,
      useFactory: (socketGateway: NotificationGateway) =>
        new SocketNotificationAdapter(socketGateway),
      inject: [NotificationGateway],
    },
    {
      provide: SendNotificationUseCase,
      useFactory: (
        emailAdapter: EmailNotificationAdapter,
        pushAdapter: FirebaseNotificationAdapter,
        socketAdapter: SocketNotificationAdapter,
      ) =>
        new SendNotificationUseCase(
          new NotificationFactoryImp(emailAdapter, pushAdapter, socketAdapter),
        ),
      inject: [
        EmailNotificationAdapter,
        FirebaseNotificationAdapter,
        SocketNotificationAdapter,
      ],
    },
  ],
})
export class NotificationModule {}
