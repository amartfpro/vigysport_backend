import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesController } from '../controllers/category.controller';
import { CategoriesService } from '../services/category.service';
import { Category } from '../models/category.model';
import { AuthModule } from './auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Category]), AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
