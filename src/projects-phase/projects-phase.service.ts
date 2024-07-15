import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectsPhaseDto } from './dto/create-projects-phase.dto';
import { UpdateProjectsPhaseDto } from './dto/update-projects-phase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsPhase } from './entities/projects-phase.entity';
import { ResponseProjectsPhaseDto } from './dto/response-project-phase.dto';
@Injectable()
export class ProjectsPhaseService {
  constructor(@InjectRepository(ProjectsPhase)
  private repository: Repository<ProjectsPhase>){

  }

  async create(createProjectsPhaseDto: CreateProjectsPhaseDto): Promise<CreateProjectsPhaseDto> {
    
    try {
      const projectsPhase = this.repository.create({
        in_nombre: createProjectsPhaseDto.in_nombre,
        tx_descripcion: createProjectsPhaseDto.tx_descripcion
      })
      return new ResponseProjectsPhaseDto(await this.repository.save(projectsPhase))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findAll(): Promise<Array<ResponseProjectsPhaseDto>> {
    try {
      const data = await this.repository.find();
      return data.map(projectP => new ResponseProjectsPhaseDto(projectP))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findOne(i012i_fase_proyecto: number): Promise<ResponseProjectsPhaseDto> {
    try {
      const projectsPhase = await this.repository.findOne({
        where: {
          i012i_fase_proyecto,
        }
      });
      if (!projectsPhase) throw new NotFoundException();
      return new ResponseProjectsPhaseDto(projectsPhase)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async update(i012i_fase_proyecto: number, updateProjectsPhaseDto: UpdateProjectsPhaseDto): Promise<UpdateProjectsPhaseDto> {
    try {
      const projectsPhase = await this.repository.update(i012i_fase_proyecto, {
        in_nombre: updateProjectsPhaseDto.in_nombre,
        tx_descripcion: updateProjectsPhaseDto.tx_descripcion
      })
      return new UpdateProjectsPhaseDto(projectsPhase);
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async remove(i012i_fase_proyecto: number): Promise<ResponseProjectsPhaseDto> {
    try {
      const projectsPhase = await this.findOne(i012i_fase_proyecto);
      await this.repository.delete(i012i_fase_proyecto);
      return new ResponseProjectsPhaseDto(projectsPhase)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }
}
