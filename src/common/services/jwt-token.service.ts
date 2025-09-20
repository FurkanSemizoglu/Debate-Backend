import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenService {
    constructor( 
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
    ) {}

  public generateAccessToken(user: any) {
    const payload = { 
      userId : user.id,
      email: user.email, 
      sub: user.id
    };
    
    const secret = this.configService.get<string>('JWT_SECRET');
    return this.jwtService.sign(payload, { 
      secret,
      expiresIn: '15m' 
    });
  }

  public generateRefreshToken(user: any) {
    const payload = { 
      sub: user.id
    };
    
    const secret = this.configService.get<string>('JWT_SECRET');
    return this.jwtService.sign(payload, { 
      secret,
      expiresIn: '7d' 
    });
  } 
}