import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ResponseTeamDto } from './dto/response-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private repository: Repository<Team>,
    private dataSource: DataSource,
  ) {}

  private qbTeam(qb: SelectQueryBuilder<Team>): SelectQueryBuilder<Team> {
    return qb
      .leftJoinAndSelect('team.c008f_i001t_trabajador', 'trabajador')
      .leftJoinAndSelect('team.c008f_i009t_gerencia_funcional', 'gf')
      .leftJoinAndSelect('team.c008f_i009t_gerencia_galba', 'gg')
      .leftJoinAndSelect('team.c008f_i009t_gerencia_tecnica', 'gt')
      .leftJoinAndSelect('team.c008f_i001t_lider_funcional', 'lf')
      .leftJoinAndSelect('team.c008f_i001t_lider_negocio', 'ln')
      .leftJoinAndSelect('team.c008f_i001t_lider_tecnico', 'lt');
  }

  async create(createTeamDto: CreateTeamDto): Promise<ResponseTeamDto> {
    return this.dataSource.transaction(async (manager) => {
      const team = manager.create(Team, {
        in_cargo: createTeamDto.in_cargo,
        c008f_i009t_gerencia_funcional:
          createTeamDto.c008f_i009t_gerencia_funcional,
        c008f_i009t_gerencia_tecnica:
          createTeamDto.c008f_i009t_gerencia_tecnica,
        c008f_i009t_gerencia_galba: createTeamDto.c008f_i009t_gerencia_galba,
        c008f_i001t_lider_funcional: createTeamDto.c008f_i001t_lider_funcional,
        c008f_i001t_lider_negocio: createTeamDto.c008f_i001t_lider_negocio,
        c008f_i001t_lider_tecnico: createTeamDto.c008f_i001t_lider_tecnico,
        c008f_i001t_trabajador: createTeamDto.c008f_i001t_trabajador,
      });
      return new ResponseTeamDto(await manager.save(team));
    });
  }

  async findAll(): Promise<Array<ResponseTeamDto>> {
    const data = await this.qbTeam(
      this.repository.createQueryBuilder('team'),
    ).getMany();
    return data.map((team) => new ResponseTeamDto(team));
  }

  async findOne(c008i_equipo_trabajo: number): Promise<ResponseTeamDto> {
    const team = await this.qbTeam(this.repository.createQueryBuilder('team'))
      .where('team.c008i_equipo_trabajo = :id', { id: c008i_equipo_trabajo })
      .getOne();
    if (!team) throw new NotFoundException();
    return new ResponseTeamDto(team);
  }

  async update(
    c008i_equipo_trabajo: number,
    updateTeamDto: UpdateTeamDto,
  ): Promise<UpdateTeamDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(Team, c008i_equipo_trabajo, {
        in_cargo: updateTeamDto.in_cargo,
        c008f_i009t_gerencia_funcional:
          updateTeamDto.c008f_i009t_gerencia_funcional,
        c008f_i009t_gerencia_tecnica:
          updateTeamDto.c008f_i009t_gerencia_tecnica,
        c008f_i009t_gerencia_galba: updateTeamDto.c008f_i009t_gerencia_galba,
        c008f_i001t_lider_funcional: updateTeamDto.c008f_i001t_lider_funcional,
        c008f_i001t_lider_negocio: updateTeamDto.c008f_i001t_lider_negocio,
        c008f_i001t_lider_tecnico: updateTeamDto.c008f_i001t_lider_tecnico,
        c008f_i001t_trabajador: updateTeamDto.c008f_i001t_trabajador,
      });
      const team = await this.qbTeam(manager.createQueryBuilder(Team, 'team'))
        .where('team.c008i_equipo_trabajo = :id', { id: c008i_equipo_trabajo })
        .getOne();
      if (!team) throw new NotFoundException();
      return new ResponseTeamDto(team);
    });
  }

  async remove(c008i_equipo_trabajo: number): Promise<ResponseTeamDto> {
    return this.dataSource.transaction(async (manager) => {
      const team = await this.qbTeam(manager.createQueryBuilder(Team, 'team'))
        .where('team.c008i_equipo_trabajo = :id', { id: c008i_equipo_trabajo })
        .getOne();
      if (!team) throw new NotFoundException();
      await manager.delete(Team, c008i_equipo_trabajo);
      return new ResponseTeamDto(team);
    });
  }
}
