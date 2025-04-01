import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class ProductsController {
  @Get() // Ejemplo
  getAllProducts() {
    return { message: 'Pedidos públicos' };
  }

  @Post()
  @UseGuards(AuthGuard('jwt')) // Ejemplo. Solo administradores pueden modificar pedidos
  createProduct() {
    return { message: 'Pedido creado correctamente' };
  }
}
