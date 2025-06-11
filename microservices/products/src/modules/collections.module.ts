import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Collection } from '../models/collection.model';
import { CollectionsService } from '../services/collection.service';
import { CollectionsController } from '../controllers/collection.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Collection]), AuthModule],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
