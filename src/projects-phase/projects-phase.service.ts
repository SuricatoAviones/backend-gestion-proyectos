import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ProjectsPhase } from './entities/projects-phase.entity';
import { CreateProjectsPhaseDto } from './dto/create-projects-phase.dto';
import { UpdateProjectsPhaseDto } from './dto/update-projects-phase.dto';
import { ResponseProjectsPhaseDto } from './dto/response-project-phase.dto';

@Injectable()
export class ProjectsPhaseService {
  constructor(
    @InjectRepository(ProjectsPhase)
    private repository: Repository<ProjectsPhase>,
    private dataSource: DataSource,
  ) {}

  async create(
    createProjectsPhaseDto: CreateProjectsPhaseDto,
  ): Promise<CreateProjectsPhaseDto> {
    return this.dataSource.transaction(async (manager) => {
      const projectsPhase = manager.create(ProjectsPhase, {
        in_nombre: createProjectsPhaseDto.in_nombre,
        tx_descripcion: createProjectsPhaseDto.tx_descripcion,
      });
      return new ResponseProjectsPhaseDto(await manager.save(projectsPhase));
    });
  }

  async findAll(): Promise<Array<ResponseProjectsPhaseDto>> {
    const data = await this.repository.find();
    return data.map((projectP) => new ResponseProjectsPhaseDto(projectP));
  }

  async findOne(
    i012i_fase_proyecto: number,
  ): Promise<ResponseProjectsPhaseDto> {
    const projectsPhase = await this.repository.findOne({
      where: {
        i012i_fase_proyecto,
      },
    });
    if (!projectsPhase) throw new NotFoundException();
    return new ResponseProjectsPhaseDto(projectsPhase);
  }

  async update(
    i012i_fase_proyecto: number,
    updateProjectsPhaseDto: UpdateProjectsPhaseDto,
  ): Promise<UpdateProjectsPhaseDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(ProjectsPhase, i012i_fase_proyecto, {
        in_nombre: updateProjectsPhaseDto.in_nombre,
        tx_descripcion: updateProjectsPhaseDto.tx_descripcion,
      });
      const projectsPhase = await manager.findOne(ProjectsPhase, {
        where: { i012i_fase_proyecto },
      });
      if (!projectsPhase) throw new NotFoundException();
      return new ResponseProjectsPhaseDto(projectsPhase);
    });
  }

  async remove(i012i_fase_proyecto: number): Promise<ResponseProjectsPhaseDto> {
    return this.dataSource.transaction(async (manager) => {
      const projectsPhase = await manager.findOne(ProjectsPhase, {
        where: { i012i_fase_proyecto },
      });
      if (!projectsPhase) throw new NotFoundException();
      await manager.delete(ProjectsPhase, i012i_fase_proyecto);
      return new ResponseProjectsPhaseDto(projectsPhase);
    });
  }
}
