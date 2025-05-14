import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'amart',
      password: process.env.DB_PASSWORD || 'amartroot',
      database: process.env.DB_NAME || 'vigysport',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    SequelizeModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
