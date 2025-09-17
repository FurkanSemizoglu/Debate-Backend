import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenService {
    constructor( private readonly jwtService: JwtService) {}

  public generateAccessToken(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id
    };
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  public generateRefreshToken(user: any) {
    const payload = { 
      sub: user.id
    };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  } 
}