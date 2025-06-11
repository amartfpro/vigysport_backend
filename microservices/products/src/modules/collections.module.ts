import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Collection } from '../models/collection.model';
import { CollectionsService } from '../services/collection.service';
import { CollectionsController } from '../controllers/collection.controller';

@Module({
  imports: [SequelizeModule.forFeature([Collection])],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
