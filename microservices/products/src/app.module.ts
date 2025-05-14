import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Product],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Product]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class AppModule {}
