import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeProjectDto } from './dto/create-type-project.dto';
import { UpdateTypeProjectDto } from './dto/update-type-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseTypeProjectDto } from './dto/response-type-projects.dto';
import { TypeProject } from './entities/type-project.entity';

@Injectable()
export class TypeProjectsService {
  constructor(
    @InjectRepository(TypeProject)
    private repository: Repository<TypeProject>,
  ) {}

  async create(
    createTypeProjectDto: CreateTypeProjectDto,
  ): Promise<CreateTypeProjectDto> {
    const typeProject = this.repository.create({
      in_nombre: createTypeProjectDto.in_nombre,
      tx_descripcion: createTypeProjectDto.tx_descripcion,
      i011f_i012t_fase_proyecto: createTypeProjectDto.i011f_i012t_fase_proyecto,
    });
    return new ResponseTypeProjectDto(await this.repository.save(typeProject));
  }

  async findAll(): Promise<Array<ResponseTypeProjectDto>> {
    const data = await this.repository.find({
      relations: {
        i011f_i012t_fase_proyecto: true,
      },
    });
    return data.map((tProject) => new ResponseTypeProjectDto(tProject));
  }

  async findOne(i011i_tipo_proyecto: number): Promise<ResponseTypeProjectDto> {
    const typeProject = await this.repository.findOne({
      where: {
        i011i_tipo_proyecto,
      },
      relations: {
        i011f_i012t_fase_proyecto: true,
      },
    });
    if (!typeProject) throw new NotFoundException();
    return new ResponseTypeProjectDto(typeProject);
  }

  async update(
    i011i_tipo_proyecto: number,
    updateTypeProjectDto: UpdateTypeProjectDto,
  ): Promise<UpdateTypeProjectDto> {
    await this.repository.update(i011i_tipo_proyecto, {
      in_nombre: updateTypeProjectDto.in_nombre,
      tx_descripcion: updateTypeProjectDto.tx_descripcion,
      i011f_i012t_fase_proyecto: updateTypeProjectDto.i011f_i012t_fase_proyecto,
    });
    return this.findOne(i011i_tipo_proyecto);
  }

  async remove(i011i_tipo_proyecto: number): Promise<ResponseTypeProjectDto> {
    const typeProject = await this.findOne(i011i_tipo_proyecto);
    await this.repository.delete(i011i_tipo_proyecto);
    return new ResponseTypeProjectDto(typeProject);
  }
}
