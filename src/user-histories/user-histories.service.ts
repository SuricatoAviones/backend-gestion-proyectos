import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserHistoryDto } from './dto/create-user-history.dto';
import { UpdateUserHistoryDto } from './dto/update-user-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserHistory } from './entities/user-history.entity';
import { ResponseUserHistoryDto } from './dto/response-user-history.dto';
@Injectable()
export class UserHistoriesService {
  constructor(@InjectRepository(UserHistory)
  private repository: Repository<UserHistory>){

  }

  async create(createUserHistoryDto: CreateUserHistoryDto): Promise<CreateUserHistoryDto> {
    
    try {
      const userHistory = this.repository.create({
        co_historia: createUserHistoryDto.co_historia,
        in_titulo: createUserHistoryDto.in_titulo,
        tx_descripcion: createUserHistoryDto.tx_descripcion,
        tx_rol: createUserHistoryDto.tx_rol,
        tx_funcionalidad: createUserHistoryDto.tx_funcionalidad,
        tx_criterio: createUserHistoryDto.tx_criterio,
        i003i_entrada: createUserHistoryDto.i003i_entrada

      })
      return new ResponseUserHistoryDto(await this.repository.save(userHistory))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findAll(): Promise<Array<ResponseUserHistoryDto>> {
    try {
      const data = await this.repository.find({
        relations: {
          i003i_entrada: {
            i003f_i010t_area_tecnica: true,
            i003f_i011_tipo_proyecto: {
              i011f_i012t_fase_proyecto: true
            },
            i003f_i006t_estado_entrada: true,
            i0003f_i008t_equipo_trabajo: {
              c008f_i001t_trabajador: true,
              c008f_i009t_gerencia_funcional: true,
              c008f_i009t_gerencia_galba: true,
              c008f_i009t_gerencia_tecnica: true,
              c008f_i001t_lider_funcional: true,
              c008f_i001t_lider_negocio: true,
              c008f_i001t_lider_tecnico: true,
            }, // wtf
            i003f_i005t_fase_entrada: true,
            i004i_datos_adi: true,
          },
        }
      });
      return data.map(uHistory => new ResponseUserHistoryDto(uHistory))
    } catch (error) {
           console.log(error)
           throw new BadRequestException(error)

    }
  }

  async findOne(i007i_historia_usuario: number): Promise<ResponseUserHistoryDto> {
    try {
      const userHistory = await this.repository.findOne({
        where: {
          i007i_historia_usuario,
        },
        relations: {
          i003i_entrada: {
            i003f_i010t_area_tecnica: true,
            i003f_i011_tipo_proyecto: {
              i011f_i012t_fase_proyecto: true
            },
            i003f_i006t_estado_entrada: true,
            i0003f_i008t_equipo_trabajo: {
              c008f_i001t_trabajador: true,
              c008f_i009t_gerencia_funcional: true,
              c008f_i009t_gerencia_galba: true,
              c008f_i009t_gerencia_tecnica: true,
              c008f_i001t_lider_funcional: true,
              c008f_i001t_lider_negocio: true,
              c008f_i001t_lider_tecnico: true,
            }, // wtf
            i003f_i005t_fase_entrada: true,
            i004i_datos_adi: true,
          },
        }
      });
      if (!userHistory) throw new NotFoundException();
      return new ResponseUserHistoryDto(userHistory)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async update(i007i_historia_usuario: number, updateUserHistoryDto: UpdateUserHistoryDto): Promise<UpdateUserHistoryDto> {
    try {
      const userHistory = await this.repository.update(i007i_historia_usuario, {
        co_historia: updateUserHistoryDto.co_historia,
        in_titulo: updateUserHistoryDto.in_titulo,
        tx_descripcion: updateUserHistoryDto.tx_descripcion,
        tx_rol: updateUserHistoryDto.tx_rol,
        tx_funcionalidad: updateUserHistoryDto.tx_funcionalidad,
        tx_criterio: updateUserHistoryDto.tx_criterio,
        i003i_entrada: updateUserHistoryDto.i003i_entrada

      })
      return this.findOne(i007i_historia_usuario)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async remove(i007i_historia_usuario: number): Promise<ResponseUserHistoryDto> {
    try {
      const userHistory = await this.findOne(i007i_historia_usuario);
      await this.repository.delete(i007i_historia_usuario);
      return new ResponseUserHistoryDto(userHistory)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }
}
