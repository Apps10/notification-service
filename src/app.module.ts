import { Module } from '@nestjs/common'
import { NotificationModule } from './infraestructure/notification.module'

@Module({
  imports: [NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
