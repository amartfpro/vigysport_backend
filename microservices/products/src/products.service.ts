import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async getAll(): Promise<Product[]> {
    return await this.productModel.findAll();
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
    return product;
  }

  async create(productData: CreateProductDto): Promise<Product> {
    return await this.productModel.create(
      productData as CreationAttributes<Product>,
    );
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.getById(id);
    await product.update(updateProductDto);
    return product;
  }

  async remove(id: string): Promise<void> {
    const product = await this.getById(id);
    await product.destroy();
  }
}
