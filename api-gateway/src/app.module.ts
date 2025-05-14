import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsProxyController } from './controllers/products.controller';
import { OrdersProxyController } from './controllers/orders.controller';
import { UsersProxyController } from './controllers/users.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    ProductsProxyController,
    OrdersProxyController,
    UsersProxyController,
  ],
  providers: [AppService],
})
export class AppModule {}
