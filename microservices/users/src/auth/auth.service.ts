import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/login.dto';
import { User } from 'src/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async validateUserAndGenerateToken(loginDto: LoginDto): Promise<string | null> {
    const user = await User.findOne({ where: { email: loginDto.email } });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) return null;

    const payload = { userId: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }


  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  
}
