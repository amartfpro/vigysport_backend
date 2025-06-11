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
import { ProductImagesService } from '../services/product-image.service';
import {
  CreateProductImageDto,
  UpdateProductImageDto,
} from '../dto/product-image.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Get()
  async getAllProductImages() {
    return await this.productImagesService.getAll();
  }

  @Get(':id')
  async getProductImageById(@Param('id') id: string) {
    return await this.productImagesService.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createProductImageDto: CreateProductImageDto) {
    return await this.productImagesService.create(createProductImageDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return await this.productImagesService.update(id, updateProductImageDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return await this.productImagesService.remove(id);
  }
}
