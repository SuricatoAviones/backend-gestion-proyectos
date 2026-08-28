import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { TypeProject } from './entities/type-project.entity';
import { CreateTypeProjectDto } from './dto/create-type-project.dto';
import { UpdateTypeProjectDto } from './dto/update-type-project.dto';
import { ResponseTypeProjectDto } from './dto/response-type-projects.dto';

@Injectable()
export class TypeProjectsService {
  constructor(
    @InjectRepository(TypeProject)
    private repository: Repository<TypeProject>,
    private dataSource: DataSource,
  ) {}

  private qbType(
    qb: SelectQueryBuilder<TypeProject>,
  ): SelectQueryBuilder<TypeProject> {
    return qb.leftJoinAndSelect(
      'typeProject.i011f_i012t_fase_proyecto',
      'fase',
    );
  }

  async create(
    createTypeProjectDto: CreateTypeProjectDto,
  ): Promise<ResponseTypeProjectDto> {
    return this.dataSource.transaction(async (manager) => {
      const typeProject = manager.create(TypeProject, {
        in_nombre: createTypeProjectDto.in_nombre,
        tx_descripcion: createTypeProjectDto.tx_descripcion,
        i011f_i012t_fase_proyecto:
          createTypeProjectDto.i011f_i012t_fase_proyecto,
      });
      return new ResponseTypeProjectDto(await manager.save(typeProject));
    });
  }

  async findAll(): Promise<Array<ResponseTypeProjectDto>> {
    const data = await this.qbType(
      this.repository.createQueryBuilder('typeProject'),
    ).getMany();
    return data.map((tProject) => new ResponseTypeProjectDto(tProject));
  }

  async findOne(i011i_tipo_proyecto: number): Promise<ResponseTypeProjectDto> {
    const typeProject = await this.qbType(
      this.repository.createQueryBuilder('typeProject'),
    )
      .where('typeProject.i011i_tipo_proyecto = :id', {
        id: i011i_tipo_proyecto,
      })
      .getOne();
    if (!typeProject) throw new NotFoundException();
    return new ResponseTypeProjectDto(typeProject);
  }

  async update(
    i011i_tipo_proyecto: number,
    updateTypeProjectDto: UpdateTypeProjectDto,
  ): Promise<UpdateTypeProjectDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(TypeProject, i011i_tipo_proyecto, {
        in_nombre: updateTypeProjectDto.in_nombre,
        tx_descripcion: updateTypeProjectDto.tx_descripcion,
        i011f_i012t_fase_proyecto:
          updateTypeProjectDto.i011f_i012t_fase_proyecto,
      });
      const typeProject = await this.qbType(
        manager.createQueryBuilder(TypeProject, 'typeProject'),
      )
        .where('typeProject.i011i_tipo_proyecto = :id', {
          id: i011i_tipo_proyecto,
        })
        .getOne();
      if (!typeProject) throw new NotFoundException();
      return new ResponseTypeProjectDto(typeProject);
    });
  }

  async remove(i011i_tipo_proyecto: number): Promise<ResponseTypeProjectDto> {
    return this.dataSource.transaction(async (manager) => {
      const typeProject = await this.qbType(
        manager.createQueryBuilder(TypeProject, 'typeProject'),
      )
        .where('typeProject.i011i_tipo_proyecto = :id', {
          id: i011i_tipo_proyecto,
        })
        .getOne();
      if (!typeProject) throw new NotFoundException();
      await manager.delete(TypeProject, i011i_tipo_proyecto);
      return new ResponseTypeProjectDto(typeProject);
    });
  }
}
