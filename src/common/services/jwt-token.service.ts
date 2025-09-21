import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { JwtConfig } from "../../config";

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
    
    const jwtConfig = this.configService.get<JwtConfig>('jwt');
    if (!jwtConfig) {
      throw new Error('JWT configuration not found');
    }
    
    return this.jwtService.sign(payload, { 
      secret: jwtConfig.secret,
      expiresIn: jwtConfig.accessTokenExpiresIn,
    });
  }

  public generateRefreshToken(user: any) {
    const payload = { 
      sub: user.id
    };
    
    const jwtConfig = this.configService.get<JwtConfig>('jwt');
    if (!jwtConfig) {
      throw new Error('JWT configuration not found');
    }
    
    return this.jwtService.sign(payload, { 
      secret: jwtConfig.secret,
      expiresIn: jwtConfig.refreshTokenExpiresIn,
    });
  } 
}