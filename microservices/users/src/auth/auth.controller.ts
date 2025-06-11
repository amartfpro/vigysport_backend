import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from 'src/dto/users.dto';
import { UsersService } from '../services/users.service';

@Controller('auth')
export class AuthController {
  jwtService: any;
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
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    );
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return { message: 'Usuario registrado correctamente', user };
  }

  @Post('validate')
  async validateToken(@Body() body: { token: string }) {
    try {
      const decoded = await this.jwtService.verify(body.token); // Verifica el token JWT
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}
