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
import { CollectionsService } from '../services/collection.service';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
} from '../dto/collection.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async getAllCollections() {
    return await this.collectionsService.getAll();
  }

  @Get(':id')
  async getCollectionById(@Param('id') id: string) {
    return await this.collectionsService.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createCollectionDto: CreateCollectionDto) {
    return await this.collectionsService.create(createCollectionDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return await this.collectionsService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return await this.collectionsService.remove(id);
  }
}
