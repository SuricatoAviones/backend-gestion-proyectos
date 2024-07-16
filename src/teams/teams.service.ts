import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseTeamDto } from './dto/response-team.dto';
import { Team } from './entities/team.entity';
@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Team)
  private repository: Repository<Team>){

  }

  async create(createTeamDto: CreateTeamDto): Promise<CreateTeamDto> {
    
    try {
      const team = this.repository.create({
        in_cargo: createTeamDto.in_cargo,
        c008f_i009t_gerencia_funcional: createTeamDto.c008f_i009t_gerencia_funcional,
        c008f_i009t_gerencia_tecnica: createTeamDto.c008f_i009t_gerencia_tecnica,
        c008f_i009t_gerencia_galba: createTeamDto.c008f_i009t_gerencia_galba,
        c008f_i001t_lider_funcional: createTeamDto.c008f_i001t_lider_funcional,
        c008f_i001t_lider_negocio: createTeamDto.c008f_i001t_lider_negocio,
        c008f_i001t_lider_tecnico: createTeamDto.c008f_i001t_lider_tecnico,
        c008f_i001t_trabajador: createTeamDto.c008f_i001t_trabajador
      })
      return new ResponseTeamDto(await this.repository.save(team))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findAll(): Promise<Array<ResponseTeamDto>> {
    try {
      const data = await this.repository.find({
        relations: {
          c008f_i001t_trabajador: true,
          c008f_i009t_gerencia_funcional: true,
          c008f_i009t_gerencia_galba: true,
          c008f_i009t_gerencia_tecnica: true,
          c008f_i001t_lider_funcional: true,
          c008f_i001t_lider_negocio: true,
          c008f_i001t_lider_tecnico: true,
        }
      });
      return data.map(team => new ResponseTeamDto(team))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findOne(c008i_equipo_trabajo: number): Promise<ResponseTeamDto> {
    try {
      const team = await this.repository.findOne({
        where: {
          c008i_equipo_trabajo,
        },
        relations: {
          c008f_i001t_trabajador: true,
          c008f_i009t_gerencia_funcional: true,
          c008f_i009t_gerencia_galba: true,
          c008f_i009t_gerencia_tecnica: true,
          c008f_i001t_lider_funcional: true,
          c008f_i001t_lider_negocio: true,
          c008f_i001t_lider_tecnico: true,
        }
      });
      if (!team) throw new NotFoundException();
      return new ResponseTeamDto(team)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async update(c008i_equipo_trabajo: number, updateTeamDto: UpdateTeamDto): Promise<UpdateTeamDto> {
    try {
      const team = await this.repository.update(c008i_equipo_trabajo, {
        in_cargo: updateTeamDto.in_cargo,
        c008f_i009t_gerencia_funcional: updateTeamDto.c008f_i009t_gerencia_funcional,
        c008f_i009t_gerencia_tecnica: updateTeamDto.c008f_i009t_gerencia_tecnica,
        c008f_i009t_gerencia_galba: updateTeamDto.c008f_i009t_gerencia_galba,
        c008f_i001t_lider_funcional: updateTeamDto.c008f_i001t_lider_funcional,
        c008f_i001t_lider_negocio: updateTeamDto.c008f_i001t_lider_negocio,
        c008f_i001t_lider_tecnico: updateTeamDto.c008f_i001t_lider_tecnico,
        c008f_i001t_trabajador: updateTeamDto.c008f_i001t_trabajador
      })
      return this.findOne(c008i_equipo_trabajo)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async remove(c008i_equipo_trabajo: number): Promise<ResponseTeamDto> {
    try {
      const team = await this.findOne(c008i_equipo_trabajo);
      await this.repository.delete(c008i_equipo_trabajo);
      return team
    } catch (error) {
           throw new BadRequestException(error)

    }
  }
}
