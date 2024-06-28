import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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
      const user = this.repository.create({
        co_historia: createUserDto.co_historia,
        in_titulo: createUserDto.in_titulo,
        tx_descripcion: createUserDto.tx_descripcion,
        tx_rol: createUserDto.tx_rol,
        tx_funcionalidad: createUserDto.tx_funcionalidad,
        tx_criterio: createUserDto.tx_criterio,
        i003i_entrada: createUserDto.i003i_entrada,
      });
      return new ResponseUserDto(
        await this.repository.save(userHistory),
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

  /* async findAll(): Promise<Array<ResponseUserDto>> {

  } */

  /* async findOne(
    i007i_historia_usuario: number,
  ): Promise<ResponseUserDto> {
   
  } */

  async update(
    i007i_historia_usuario: number,
    updateUserHistoryDto: UpdateUserHistoryDto,
  ): Promise<UpdateUserHistoryDto> {
    try {
      const userHistory = await this.repository.update(i007i_historia_usuario, {
        co_historia: updateUserHistoryDto.co_historia,
        in_titulo: updateUserHistoryDto.in_titulo,
        tx_descripcion: updateUserHistoryDto.tx_descripcion,
        tx_rol: updateUserHistoryDto.tx_rol,
        tx_funcionalidad: updateUserHistoryDto.tx_funcionalidad,
        tx_criterio: updateUserHistoryDto.tx_criterio,
        i003i_entrada: updateUserHistoryDto.i003i_entrada,
      });
      return new UpdateUserHistoryDto(userHistory);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(
    i007i_historia_usuario: number,
  ): Promise<ResponseUserHistoryDto> {
    try {
      const userHistory = await this.findOne(i007i_historia_usuario);
      await this.repository.delete(i007i_historia_usuario);
      return new ResponseUserDto(userHistory);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
