import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async getAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async getById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    return await this.userModel.create(userData);
  }

  async update(id: number, userData: UpdateUserDto): Promise<User> {
    const user = await this.getById(id);
    await user.update(userData);
    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.getById(id);
    await user.destroy();
  }
}
