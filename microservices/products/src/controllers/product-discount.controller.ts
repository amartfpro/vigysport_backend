import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductDiscountsService } from '../services/product-discount.service';
import {
  CreateProductDiscountDto,
  UpdateProductDiscountDto,
} from '../dto/product-discount.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product-discounts')
export class ProductDiscountsController {
  constructor(
    private readonly productDiscountsService: ProductDiscountsService,
  ) {}

  @Get()
  async getAllProductDiscounts() {
    return await this.productDiscountsService.getAll();
  }

  @Get(':id')
  async getProductDiscountById(@Param('id') id: string) {
    return await this.productDiscountsService.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createProductDiscountDto: CreateProductDiscountDto) {
    return await this.productDiscountsService.create(createProductDiscountDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateProductDiscountDto: UpdateProductDiscountDto,
  ) {
    return await this.productDiscountsService.update(
      id,
      updateProductDiscountDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return await this.productDiscountsService.remove(id);
  }
}
