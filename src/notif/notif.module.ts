import { Module } from '@nestjs/common';
import { NotifGateway } from './notif.gateway';

@Module({
    controllers: [],
    providers: [NotifGateway]
})
export class NotificationsModule {}
