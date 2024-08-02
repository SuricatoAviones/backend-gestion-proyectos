import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { Cost } from './entities/cost.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseCostDto } from './dto/response-cost.dto';

@Injectable()
export class CostsService {
  constructor(@InjectRepository(Cost)
  private repository: Repository<Cost>) {

  }

  async create(createCostDto: CreateCostDto): Promise<ResponseCostDto> {
    try {
      const cost = this.repository.create({
        nu_monto: createCostDto.nu_monto,
        i016f_i003t_entrada: createCostDto.i016f_i003t_entrada,
        in_titulo: createCostDto.in_titulo,
      })
      return new ResponseCostDto(await this.repository.save(cost))
    } catch (error) {
      throw new BadRequestException(error)

    }

  }

  async findAll(): Promise<Array<ResponseCostDto>> {
    try {
      const costs = await this.repository.find({
        relations: {
          i016f_i003t_entrada: {
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
            i003f_i004t_datos_adi: true,
          },
        }
      })
      return costs.map(cost => new ResponseCostDto(cost))
    } catch (error) {
      throw new BadRequestException(error)

    }

  }

  async findOne(i016i_costo: number) {
    try {
      const cost = await this.repository.findOne({
        where: {
          i016i_costo
        },
        relations: {
          i016f_i003t_entrada: {
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
            i003f_i004t_datos_adi: true,
          },
        }
      })
      if (!cost) throw new NotFoundException();
      return new ResponseCostDto(cost)
    } catch (error) {

    }


  }

  async update(i016i_costo: number, updateCostDto: UpdateCostDto): Promise<UpdateCostDto> {
    try {
      const cost = await this.findOne(i016i_costo);
      await this.repository.update(i016i_costo, {
        i016f_i003t_entrada: updateCostDto.i016f_i003t_entrada,
        in_titulo: updateCostDto.in_titulo,
        nu_monto: updateCostDto.nu_monto
      });
      return this.findOne(i016i_costo)
    } catch (error) {
      throw new BadRequestException(error)

    }

  }

  async remove(i016i_costo: number): Promise<ResponseCostDto> {
    try {
      const cost = await this.findOne(i016i_costo);
      await this.repository.delete(i016i_costo)
      return new ResponseCostDto(cost)
    } catch (error) {
      throw new BadRequestException(error)
      ;
    }

  }
}


