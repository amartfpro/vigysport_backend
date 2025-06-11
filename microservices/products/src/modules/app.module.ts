import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products.module';
import { CategoriesModule } from './categories.module';
import { CollectionsModule } from './collections.module';
import { ProductImagesModule } from './product-images.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    ProductsModule,
    CategoriesModule,
    CollectionsModule,
    ProductImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
