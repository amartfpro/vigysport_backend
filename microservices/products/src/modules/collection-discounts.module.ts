import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CollectionDiscount } from '../models/collection-discount.model';
import { CollectionDiscountsService } from '../services/collection-discount.service';
import { CollectionDiscountsController } from '../controllers/collection-discount.controller';

@Module({
  imports: [SequelizeModule.forFeature([CollectionDiscount])],
  controllers: [CollectionDiscountsController],
  providers: [CollectionDiscountsService],
})
export class CollectionDiscountModule {}
