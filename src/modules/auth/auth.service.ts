import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { RegisterDto } from './Dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtTokenService } from 'src/common/services/jwt-token.service';
import { LoginDto } from './Dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const validatedUser = await this.validateUser(loginDto.email, loginDto.password);

      // Eski refresh token'ları temizle
      await this.prisma.refreshToken.deleteMany({
        where: { userId: validatedUser.id },
      });

      // Yeni refresh token oluştur ve kaydet
      const refreshToken = this.jwtTokenService.generateRefreshToken(validatedUser);
      await this.prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: validatedUser.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 gün
        },
      });

      return {
        access_token: this.jwtTokenService.generateAccessToken(validatedUser),
        refresh_token: refreshToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Login failed. Please try again.');
    }
  }

  /*   private generateAccessToken(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role 
    };
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  private generateRefreshToken(user: any) {
    const payload = { 
      sub: user.id
    };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  } */

/*   async refresh(refreshToken: string) {
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return {
      access_token: this.jwtTokenService.generateAccessToken(tokenRecord.user),
    };
  } */

  async logout(userId: string) {
    try {
      if (!userId) {
        throw new BadRequestException('User ID is required');
      }

      await this.prisma.refreshToken.deleteMany({
        where: { userId },
      });

      return { message: 'Logout successful' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Logout failed. Please try again.');
    }
  }

  async validateUser(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new UnauthorizedException('Email and password are required');
      }

      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Authentication failed. Please check your credentials.');
    }
  }


  async register(registerDto: RegisterDto) {
    try {
      // Input validation
      if (!registerDto.email || !registerDto.password || !registerDto.name || !registerDto.surname) {
        throw new BadRequestException('All required fields must be provided');
      }

      if (registerDto.password.length < 6) {
        throw new BadRequestException('Password must be at least 6 characters long');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      // Email kontrolü
      const existingUser = await this.prisma.user.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      return await this.prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: {
            name: registerDto.name,
            surname: registerDto.surname,
            email: registerDto.email,
            password: hashedPassword,
            age: registerDto.age
          },
        });
        
        // Remove password from return object
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      // Handle Prisma unique constraint errors
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }
      
      throw new BadRequestException('Registration failed. Please try again.');
    }
  }
}
