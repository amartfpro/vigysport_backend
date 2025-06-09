import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from '../models/orders.model';
import { CreateOrderDto, UpdateOrderDto } from '../dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  async getAll(): Promise<Order[]> {
    return this.orderModel.findAll();
  }

  async getById(id: string): Promise<Order> {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada.`);
    }
    return order;
  }

  async create(orderData: CreateOrderDto): Promise<Order> {
    return this.orderModel.create(orderData);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.getById(id);
    await order.update(updateOrderDto);
    return order;
  }

  async remove(id: string): Promise<void> {
    const order = await this.getById(id);
    await order.destroy();
  }
}
