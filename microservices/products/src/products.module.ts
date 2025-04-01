import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './products.model';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
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
