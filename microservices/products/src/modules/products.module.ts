import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { ProductsController } from '../controllers/products.controller';
import { ProductImage } from '../models/product-image.model';
import { ProductDiscount } from '../models/product-discount.model';
import { CollectionDiscount } from '../models/collection-discount.model';
import { Category } from '../models/category.model';
import { Collection } from '../models/collection.model';
import { AuthModule } from '../modules/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      ProductImage,
      ProductDiscount,
      CollectionDiscount,
      Category,
      Collection,
    ]),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
