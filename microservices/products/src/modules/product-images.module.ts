import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductImage } from '../models/product-image.model';
import { ProductImagesService } from '../services/product-image.service';
import { ProductImagesController } from '../controllers/product-image.controller';
import { Product } from '../models/product.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductImage, Product])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
