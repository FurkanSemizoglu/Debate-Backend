import { Controller, Post, Body, UnauthorizedException, Request, UseGuards } from '@nestjs/common';
import { RegisterDto } from './Dto/register.dto';
import { LoginDto } from './Dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {

    return this.authService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Request() req) {
    await this.authService.logout(req.user.sub);
    return { message: 'Logged out successfully' };
  }
}
