import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DiscountService } from '../services/discount.service';
import { CreateDiscountDto, UpdateDiscountDto } from '../dto/discount.dto';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get()
  async getAllDiscounts() {
    return await this.discountService.getAll();
  }

  @Get(':id')
  async getDiscountById(@Param('id') id: string) {
    return await this.discountService.getById(id);
  }

  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    return await this.discountService.create(createDiscountDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return await this.discountService.update(id, updateDiscountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.discountService.remove(id);
  }
}
