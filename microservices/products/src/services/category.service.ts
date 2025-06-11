import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../models/category.model';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryModel.findAll({ include: [Category] });
  }

  async getById(id: string): Promise<Category> {
    const category = await this.categoryModel.findByPk(id, {
      include: [Category],
    });
    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada.`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create(
      createCategoryDto as CreationAttributes<Category>,
    );
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.getById(id);
    await category.update(updateCategoryDto);
    return category;
  }

  async remove(id: string): Promise<void> {
    const category = await this.getById(id);
    await category.destroy();
  }
}
