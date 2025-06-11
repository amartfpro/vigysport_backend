import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products.module';
import { CategoriesModule } from './categories.module';
import { CollectionsModule } from './collections.module';
import { ProductImagesModule } from './product-images.module';
import { DiscountModule } from './discount.module';
import { Product } from 'src/models/product.model';
import { Category } from 'src/models/category.model';
import { Collection } from 'src/models/collection.model';
import { ProductImage } from 'src/models/product-image.model';
import { CollectionDiscount } from 'src/models/collection-discount.model';
import { ProductDiscount } from 'src/models/product-discount.model';
import { Discount } from 'src/models/discount.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        Product,
        Category,
        Collection,
        ProductImage,
        CollectionDiscount,
        ProductDiscount,
        Discount,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    ProductsModule,
    CategoriesModule,
    CollectionsModule,
    ProductImagesModule,
    DiscountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
