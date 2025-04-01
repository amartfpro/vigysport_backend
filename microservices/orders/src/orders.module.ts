import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import * as dotenv from 'dotenv';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { AuthService } from './auth/auth.service';

dotenv.config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    SequelizeModule.forFeature([Order]),
  ],
  controllers: [OrdersController],
  providers: [JwtStrategy, OrdersService, AuthService],
  exports: [JwtModule, OrdersService, AuthService],
})
export class AuthModule {}
