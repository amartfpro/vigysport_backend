import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './products.model';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [SequelizeModule.forFeature([Product]), AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService, AuthService],
  exports: [ProductsService, AuthService],
})
export class ProductsModule {}
