import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants/jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ?? jwtConstants.secret,
    });
  }

  async validate(payload: {
    id: number;
    email: string;
    role: string;
    nombre: string;
    apellido: string;
    foto: string;
    usuario: string;
  }) {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      nombre: payload.nombre,
      apellido: payload.apellido,
      foto: payload.foto,
      usuario: payload.usuario,
    };
  }
}
