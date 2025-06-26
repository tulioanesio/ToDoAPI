import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/dtos/login-user-dto';
import { RegisterDTO } from 'src/dtos/register-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDTO) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(data: LoginDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const acessToken = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return { acessToken };
  }
}
