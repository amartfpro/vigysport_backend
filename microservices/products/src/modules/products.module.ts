import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from '../services/products.service';
import { ProductsController } from '../controllers/products.controller';
import { Product } from '../models/product.model';
import { AuthModule } from '../modules/auth.module';
import { AuthService } from '../services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    SequelizeModule.forFeature([Product]),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [JwtModule, ProductsService, AuthService],
  exports: [JwtModule, ProductsService, AuthService],
})
export class ProductsModule {}
