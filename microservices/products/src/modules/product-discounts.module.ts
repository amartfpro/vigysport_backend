import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductDiscount } from '../models/product-discount.model';
import { ProductDiscountsService } from '../services/product-discount.service';
import { ProductDiscountsController } from '../controllers/product-discount.controller';

@Module({
  imports: [SequelizeModule.forFeature([ProductDiscount])],
  controllers: [ProductDiscountsController],
  providers: [ProductDiscountsService],
})
export class ProductDiscountModule {}
