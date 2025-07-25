import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../models/product.model';
import { CreateProductDto, UpdateProductDto } from '../dto/products.dto';
import { ProductImage } from '../models/product-image.model';
import { ProductDiscount } from '../models/product-discount.model';
import { CollectionDiscount } from '../models/collection-discount.model';
import { Category } from '../models/category.model';
import { Collection } from '../models/collection.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async getAll(): Promise<Product[]> {
    return await this.productModel.findAll({
      include: [
        ProductImage,
        ProductDiscount,
        CollectionDiscount,
        Category,
        Collection,
      ],
    });
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productModel.findByPk(id, {
      include: [
        ProductImage,
        ProductDiscount,
        CollectionDiscount,
        Category,
        Collection,
      ],
    });
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
