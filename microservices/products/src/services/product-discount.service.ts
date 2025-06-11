import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDiscount } from '../models/product-discount.model';
import {
  CreateProductDiscountDto,
  UpdateProductDiscountDto,
} from '../dto/product-discount.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class ProductDiscountsService {
  constructor(
    @InjectModel(ProductDiscount)
    private productDiscountModel: typeof ProductDiscount,
  ) {}

  async getAll(): Promise<ProductDiscount[]> {
    return await this.productDiscountModel.findAll();
  }

  async getById(id: string): Promise<ProductDiscount> {
    const discount = await this.productDiscountModel.findByPk(id);
    if (!discount) {
      throw new NotFoundException(`Descuento con ID ${id} no encontrado.`);
    }
    return discount;
  }

  async create(
    createProductDiscountDto: CreateProductDiscountDto,
  ): Promise<ProductDiscount> {
    return await this.productDiscountModel.create(
      createProductDiscountDto as CreationAttributes<ProductDiscount>,
    );
  }

  async update(
    id: string,
    updateProductDiscountDto: UpdateProductDiscountDto,
  ): Promise<ProductDiscount> {
    const discount = await this.getById(id);
    await discount.update(updateProductDiscountDto);
    return discount;
  }

  async remove(id: string): Promise<void> {
    const discount = await this.getById(id);
    await discount.destroy();
  }
}
