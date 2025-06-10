import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsProxyController } from './controllers/products.controller';
import { OrdersProxyController } from './controllers/orders.controller';
import { UsersProxyController } from './controllers/users.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    ProductsProxyController,
    OrdersProxyController,
    UsersProxyController,
  ],
})
export class AppModule {}
