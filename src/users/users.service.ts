import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from './enums/roles.enum';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcryptjs from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userReporsitory: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    try {

      
      if (!Object.values(Roles).includes(createUserDto.in_role as Roles)) {
        throw new BadRequestException('Rol no definido');
      }
      
      const user = this.userReporsitory.create({
        in_usuario: createUserDto.in_usuario,
        in_nombre: createUserDto.in_nombre,
        in_apellido: createUserDto.in_apellido,
        foto: createUserDto.foto,
        in_correo: createUserDto.in_correo,
        in_role: createUserDto.in_role,
        password: await bcryptjs.hash(createUserDto.password, 10),
      });


      return new ResponseUserDto(
        await this.userReporsitory.save(user)
      );
    } catch (error) {
           throw new BadRequestException(error)
;
    }
  }

  async findOneByEmail(in_correo:string){
    try {
        return this.userReporsitory.findOneBy({in_correo})
    } catch (error) {
      throw new BadRequestException(error)
        
    }
  }

  async findOneByUser(in_usuario:string){
    try {
      return this.userReporsitory.findOneBy({in_usuario})
    } catch (error) {
      
    }
  }

  async findAll(): Promise<Array<ResponseUserDto>> {
    try {
      const data = await this.userReporsitory.find();
      return data.map(user => new ResponseUserDto(user));
    } catch (error) {
           throw new BadRequestException(error)

    }

  }

  async findOne(
    i001i_usuario: number,
  ): Promise<ResponseUserDto> {
    try {
      const user = await this.userReporsitory.findOne({where: {
        i001i_usuario
      }})
      if (!user) throw new NotFoundException()
        return new ResponseUserDto(user)
    } catch (error) {
           throw new BadRequestException(error)

    }
  } 

  async update(
    i007i_historia_usuario: number,
    updateUserHistoryDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    try {
      const userHistory = await this.userReporsitory.update(i007i_historia_usuario, {
        in_usuario: updateUserHistoryDto.in_usuario,
        in_nombre: updateUserHistoryDto.in_nombre,
        in_apellido: updateUserHistoryDto.in_apellido,
        foto: updateUserHistoryDto.foto,
        in_correo: updateUserHistoryDto.in_correo,
        in_role: updateUserHistoryDto.in_role,
        password: updateUserHistoryDto.password,
      });
      console.log(userHistory); 
      return this.findOne(i007i_historia_usuario);
    } catch (error) {
           throw new BadRequestException(error)
;
    }
  }

  async remove(
    i007i_historia_usuario: number,
  ): Promise<ResponseUserDto> {
    try {
      const user = this.findOne(i007i_historia_usuario);
      await this.userReporsitory.delete(i007i_historia_usuario);
      return user
    } catch (error) {
           throw new BadRequestException(error)
;
    }
  }
}
