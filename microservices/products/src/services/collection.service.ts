import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Collection } from '../models/collection.model';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
} from '../dto/collection.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection) private collectionModel: typeof Collection,
  ) {}

  async getAll(): Promise<Collection[]> {
    return await this.collectionModel.findAll();
  }

  async getById(id: string): Promise<Collection> {
    const collection = await this.collectionModel.findByPk(id);
    if (!collection) {
      throw new NotFoundException(`Colección con ID ${id} no encontrada.`);
    }
    return collection;
  }

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    return await this.collectionModel.create(
      createCollectionDto as CreationAttributes<Collection>,
    );
  }

  async update(
    id: string,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    const collection = await this.getById(id);
    await collection.update(updateCollectionDto);
    return collection;
  }

  async remove(id: string): Promise<void> {
    const collection = await this.getById(id);
    await collection.destroy();
  }
}
