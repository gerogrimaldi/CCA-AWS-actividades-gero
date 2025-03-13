import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({cors: true})
export class NotifGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): string {
    console.log('Message received: ', message);
    return `Server says: ${message}`;
  }

  handleStockUpdate(productName: string, stock: number): void {
    console.log('Notifying stock change:\n', productName, "  |  Stock: ", stock);
    this.server.emit('stockUpdate', {productName, stock});
  }
}
