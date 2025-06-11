import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CollectionDiscount } from '../models/collection-discount.model';
import {
  CreateCollectionDiscountDto,
  UpdateCollectionDiscountDto,
} from '../dto/collection-discount.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class CollectionDiscountsService {
  constructor(
    @InjectModel(CollectionDiscount)
    private collectionDiscountModel: typeof CollectionDiscount,
  ) {}

  async getAll(): Promise<CollectionDiscount[]> {
    return await this.collectionDiscountModel.findAll();
  }

  async getById(id: string): Promise<CollectionDiscount> {
    const discount = await this.collectionDiscountModel.findByPk(id);
    if (!discount) {
      throw new NotFoundException(`Descuento con ID ${id} no encontrado.`);
    }
    return discount;
  }

  async create(
    createCollectionDiscountDto: CreateCollectionDiscountDto,
  ): Promise<CollectionDiscount> {
    return await this.collectionDiscountModel.create(
      createCollectionDiscountDto as CreationAttributes<CollectionDiscount>,
    );
  }

  async update(
    id: string,
    updateCollectionDiscountDto: UpdateCollectionDiscountDto,
  ): Promise<CollectionDiscount> {
    const discount = await this.getById(id);
    await discount.update(updateCollectionDiscountDto);
    return discount;
  }

  async remove(id: string): Promise<void> {
    const discount = await this.getById(id);
    await discount.destroy();
  }
}
