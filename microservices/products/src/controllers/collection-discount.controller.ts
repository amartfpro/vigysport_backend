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
import { CollectionDiscountsService } from '../services/collection-discount.service';
import {
  CreateCollectionDiscountDto,
  UpdateCollectionDiscountDto,
} from '../dto/collection-discount.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('collection-discounts')
export class CollectionDiscountsController {
  constructor(
    private readonly collectionDiscountsService: CollectionDiscountsService,
  ) {}

  @Get()
  async getAllCollectionDiscounts() {
    return await this.collectionDiscountsService.getAll();
  }

  @Get(':id')
  async getCollectionDiscountById(@Param('id') id: string) {
    return await this.collectionDiscountsService.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createCollectionDiscountDto: CreateCollectionDiscountDto,
  ) {
    return await this.collectionDiscountsService.create(
      createCollectionDiscountDto,
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateCollectionDiscountDto: UpdateCollectionDiscountDto,
  ) {
    return await this.collectionDiscountsService.update(
      id,
      updateCollectionDiscountDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return await this.collectionDiscountsService.remove(id);
  }
}
