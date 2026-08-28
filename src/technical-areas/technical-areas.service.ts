import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { TechnicalArea } from './entities/technical-area.entity';
import { CreateTechnicalAreaDto } from './dto/create-technical-area.dto';
import { UpdateTechnicalAreaDto } from './dto/update-technical-area.dto';
import { ResponseTechnicalAreaDto } from './dto/technical-areas.dto';

@Injectable()
export class TechnicalAreasService {
  constructor(
    @InjectRepository(TechnicalArea)
    private repository: Repository<TechnicalArea>,
    private dataSource: DataSource,
  ) {}

  async create(
    createTechnicalAreaDto: CreateTechnicalAreaDto,
  ): Promise<CreateTechnicalAreaDto> {
    return this.dataSource.transaction(async (manager) => {
      const technicalArea = manager.create(TechnicalArea, {
        in_nombre: createTechnicalAreaDto.in_nombre,
        tx_descripcion: createTechnicalAreaDto.tx_descripcion,
      });
      return new ResponseTechnicalAreaDto(await manager.save(technicalArea));
    });
  }

  async findAll(): Promise<Array<ResponseTechnicalAreaDto>> {
    const data = await this.repository.find();
    return data.map((tArea) => new ResponseTechnicalAreaDto(tArea));
  }

  async findOne(i010i_area_tecnica: number): Promise<ResponseTechnicalAreaDto> {
    const technicalArea = await this.repository.findOne({
      where: {
        i010i_area_tecnica,
      },
    });
    if (!technicalArea) throw new NotFoundException();
    return new ResponseTechnicalAreaDto(technicalArea);
  }

  async update(
    i010i_area_tecnica: number,
    updateTechnicalAreaDto: UpdateTechnicalAreaDto,
  ): Promise<UpdateTechnicalAreaDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(TechnicalArea, i010i_area_tecnica, {
        in_nombre: updateTechnicalAreaDto.in_nombre,
        tx_descripcion: updateTechnicalAreaDto.tx_descripcion,
      });
      const technicalArea = await manager.findOne(TechnicalArea, {
        where: { i010i_area_tecnica },
      });
      if (!technicalArea) throw new NotFoundException();
      return new ResponseTechnicalAreaDto(technicalArea);
    });
  }

  async remove(i010i_area_tecnica: number): Promise<ResponseTechnicalAreaDto> {
    return this.dataSource.transaction(async (manager) => {
      const technicalArea = await manager.findOne(TechnicalArea, {
        where: { i010i_area_tecnica },
      });
      if (!technicalArea) throw new NotFoundException();
      await manager.delete(TechnicalArea, i010i_area_tecnica);
      return new ResponseTechnicalAreaDto(technicalArea);
    });
  }
}
