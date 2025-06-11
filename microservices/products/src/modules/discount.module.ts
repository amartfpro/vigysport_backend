import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discount } from '../models/discount.model';
import { DiscountService } from '../services/discount.service';
import { DiscountController } from '../controllers/discount.controller';

@Module({
  imports: [SequelizeModule.forFeature([Discount])],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
