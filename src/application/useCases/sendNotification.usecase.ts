export class SendNotificationUseCase {
  constructor(
    private readonly notificationPort: NotificationPort,
  ){}  

  async excecute(){
    const notification = new Notification()
  }
}
