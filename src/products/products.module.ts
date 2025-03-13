import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { NotifGateway } from 'src/notif/notif.gateway';

@Module({
  imports: [NotifGateway],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, JwtService, NotifGateway],
})
export class ProductsModule {}
