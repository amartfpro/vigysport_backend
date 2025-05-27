import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUserById(@Param('id') id: number) {
    return this.usersService.getById(id);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    dto.password = await this.authService.hashPassword(dto.password);
    return this.usersService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  updateUser(@Param('id') id: number, @Body() userData: UpdateUserDto) {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
