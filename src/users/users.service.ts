import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from './enums/roles.enum';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
        password: createUserDto.password,
      });


      return new ResponseUserDto(
        await this.userReporsitory.save(user)
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOneByEmail(in_correo:string){
    try {
        return this.userReporsitory.findOneBy({in_correo})
    } catch (error) {
        
    }
  }

  async findAll(): Promise<Array<ResponseUserDto>> {
    try {
      const data = await this.userReporsitory.find();
      return data.map(user => new ResponseUserDto(user));
    } catch (error) {
      throw new BadRequestException()
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
      throw new BadRequestException()
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
      return new UpdateUserDto(userHistory);
    } catch (error) {
      throw new BadRequestException();
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
      throw new BadRequestException();
    }
  }
}
