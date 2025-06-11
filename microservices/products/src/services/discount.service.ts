import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Discount } from '../models/discount.model';
import { CreateDiscountDto, UpdateDiscountDto } from '../dto/discount.dto';
import { Op } from 'sequelize';
import { ProductDiscount } from 'src/models/product-discount.model';
import { CollectionDiscount } from 'src/models/collection-discount.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class DiscountService {
  constructor(@InjectModel(Discount) private discountModel: typeof Discount) {}

  async getAll(): Promise<Discount[]> {
    return await this.discountModel.findAll();
  }

  async getById(id: string): Promise<Discount> {
    const discount = await this.discountModel.findByPk(id);
    if (!discount) {
      throw new NotFoundException(`Descuento con ID ${id} no encontrado.`);
    }
    return discount;
  }

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const discountData: CreationAttributes<Discount> = {
      ...createDiscountDto,
      validFrom: new Date(createDiscountDto.validFrom),
      validUntil: new Date(createDiscountDto.validUntil),
    };

    return this.discountModel.create(discountData);
  }

  async update(
    id: string,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    const discount = await this.getById(id);
    await discount.update(updateDiscountDto);
    return discount;
  }

  async remove(id: string): Promise<void> {
    const discount = await this.getById(id);
    await discount.destroy();
  }

  // Método para aplicar descuentos a productos
  async applyProductDiscounts(product): Promise<Discount[]> {
    const discounts = await this.discountModel.findAll({
      where: {
        discountType: 'product',
        validFrom: { [Op.lte]: new Date() },
        validUntil: { [Op.gte]: new Date() },
        isActive: true,
      },
      include: [
        {
          model: ProductDiscount,
          where: { productId: product.id },
        },
      ],
    });
    return discounts;
  }

  // Método para aplicar descuento de colección
  async applyCollectionDiscounts(collectionId): Promise<Discount[]> {
    const discounts = await this.discountModel.findAll({
      where: {
        discountType: 'collection',
        validFrom: { [Op.lte]: new Date() },
        validUntil: { [Op.gte]: new Date() },
        isActive: true,
      },
      include: [
        {
          model: CollectionDiscount,
          where: { collectionId },
        },
      ],
    });
    return discounts;
  }

  // Método para aplicar descuentos estacionales
  async applySeasonalDiscounts(): Promise<Discount[]> {
    return await this.discountModel.findAll({
      where: {
        discountType: 'seasonal',
        validFrom: { [Op.lte]: new Date() },
        validUntil: { [Op.gte]: new Date() },
        isActive: true,
      },
    });
  }
}
