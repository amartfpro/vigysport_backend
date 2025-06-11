import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductImage } from '../models/product-image.model';
import {
  CreateProductImageDto,
  UpdateProductImageDto,
} from '../dto/product-image.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectModel(ProductImage)
    private productImageModel: typeof ProductImage,
  ) {}

  async getAll(): Promise<ProductImage[]> {
    return await this.productImageModel.findAll();
  }

  async getById(id: string): Promise<ProductImage> {
    const image = await this.productImageModel.findByPk(id);
    if (!image) {
      throw new NotFoundException(`Imagen con ID ${id} no encontrada.`);
    }
    return image;
  }

  async create(
    createProductImageDto: CreateProductImageDto,
  ): Promise<ProductImage> {
    return await this.productImageModel.create(
      createProductImageDto as CreationAttributes<ProductImage>,
    );
  }

  async update(
    id: string,
    updateProductImageDto: UpdateProductImageDto,
  ): Promise<ProductImage> {
    const image = await this.getById(id);
    await image.update(updateProductImageDto);
    return image;
  }

  async remove(id: string): Promise<void> {
    const image = await this.getById(id);
    await image.destroy();
  }
}
