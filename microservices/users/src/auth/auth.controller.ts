import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from 'src/dto/users.dto';
import { UsersService } from '../users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.validateUserAndGenerateToken(loginDto);
    return { access_token: token };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await this.authService.hashPassword(createUserDto.password);
    const user = await this.usersService.create({ ...createUserDto, password: hashedPassword });
    return { message: 'Usuario registrado correctamente', user };
  }

}
