import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from './enums/roles.enum';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userReporsitory: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
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

    return new ResponseUserDto(await this.userReporsitory.save(user));
  }

  async findOneByEmail(in_correo: string) {
    return this.userReporsitory.findOneBy({ in_correo });
  }

  async findOneByUser(in_usuario: string) {
    return this.userReporsitory.findOneBy({ in_usuario });
  }

  async findAll(): Promise<Array<ResponseUserDto>> {
    const data = await this.userReporsitory.find();
    return data.map((user) => new ResponseUserDto(user));
  }

  async findOne(i001i_usuario: number): Promise<ResponseUserDto> {
    const user = await this.userReporsitory.findOne({
      where: {
        i001i_usuario,
      },
    });
    if (!user) throw new NotFoundException();
    return new ResponseUserDto(user);
  }

  async update(
    i001i_usuario: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    await this.userReporsitory.update(i001i_usuario, {
      in_usuario: updateUserDto.in_usuario,
      in_nombre: updateUserDto.in_nombre,
      in_apellido: updateUserDto.in_apellido,
      foto: updateUserDto.foto,
      in_correo: updateUserDto.in_correo,
      in_role: updateUserDto.in_role,
      password: await bcryptjs.hash(updateUserDto.password, 10),
    });
    return this.findOne(i001i_usuario);
  }

  async remove(i001i_usuario: number): Promise<ResponseUserDto> {
    const user = this.findOne(i001i_usuario);
    await this.userReporsitory.delete(i001i_usuario);
    return user;
  }
}
