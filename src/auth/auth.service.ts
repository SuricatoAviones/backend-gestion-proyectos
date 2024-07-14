import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}
    
    // async register({ in_correo, password }: RegisterDto){
    //     const user = await this.usersService.findOneByEmail(in_correo)
    //     if (user) {
    //         throw new BadRequestException('User already exists');
    //       }
      
    //       await this.usersService.create({
    //         in_correo,
    //         password: await bcryptjs.hash(password, 10),
    //       });
      
    //       return {
            
    //         in_correo,
    //       };
    // }

    async login({ in_correo, password }: LoginDto){
        const user = await this.usersService.findOneByEmail(in_correo);
        if (!user) {
        throw new UnauthorizedException('Email is wrong');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
        throw new UnauthorizedException('password is wrong');
        }

        const payload = { email: user.in_correo, role: user.in_role, nombre: user.in_nombre, apellido: user.in_apellido, foto: user.foto, usuario: user.in_usuario };
        const token = await this.jwtService.signAsync(payload);

        return {
        token,
        payload
        };
    }

    async profile({ in_correo, role }: { in_correo: string; role: string }) {
        return await this.usersService.findOneByEmail(in_correo);
    }
    
}
