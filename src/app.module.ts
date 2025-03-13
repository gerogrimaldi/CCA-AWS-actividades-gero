import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'; //necesario para procesar las variables de entornjo
import { AuthModule } from './auth/auth.module';
import { NotifGateway } from './notif/notif.gateway';
import { S3Module } from './s3/s3.module';


@Module({
  imports: [PrismaModule, ProductsModule, UsersModule, ConfigModule.forRoot(), AuthModule, S3Module],
  // config Module lee si tenemos variables de entornos (en el .env) y nos la procesa
  controllers: [],
  providers: [NotifGateway],
})
export class AppModule {}
