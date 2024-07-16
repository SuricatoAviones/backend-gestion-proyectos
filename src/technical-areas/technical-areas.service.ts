import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTechnicalAreaDto } from './dto/create-technical-area.dto';
import { UpdateTechnicalAreaDto } from './dto/update-technical-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseTechnicalAreaDto } from './dto/technical-areas.dto';
import { TechnicalArea } from './entities/technical-area.entity';
@Injectable()
export class TechnicalAreasService {
  constructor(@InjectRepository(TechnicalArea)
  private repository: Repository<TechnicalArea>){

  }

  async create(createTechnicalAreaDto: CreateTechnicalAreaDto): Promise<CreateTechnicalAreaDto> {
    
    try {
      const technicalArea = this.repository.create({
        in_nombre: createTechnicalAreaDto.in_nombre,
        tx_descripcion: createTechnicalAreaDto.tx_descripcion
      })
      return new ResponseTechnicalAreaDto(await this.repository.save(technicalArea))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findAll(): Promise<Array<ResponseTechnicalAreaDto>> {
    try {
      const data = await this.repository.find();
      return data.map(tArea => new ResponseTechnicalAreaDto(tArea))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findOne(i010i_area_tecnica: number): Promise<ResponseTechnicalAreaDto> {
    try {
      const technicalArea = await this.repository.findOne({
        where: {
          i010i_area_tecnica,
        }
      });
      if (!technicalArea) throw new NotFoundException();
      return new ResponseTechnicalAreaDto(technicalArea)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async update(i010i_area_tecnica: number, updateTechnicalAreaDto: UpdateTechnicalAreaDto): Promise<UpdateTechnicalAreaDto> {
    try {
      const technicalArea = await this.repository.update(i010i_area_tecnica, {
        in_nombre: updateTechnicalAreaDto.in_nombre,
        tx_descripcion: updateTechnicalAreaDto.tx_descripcion
      })
      return this.findOne(i010i_area_tecnica)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async remove(i010i_area_tecnica: number): Promise<ResponseTechnicalAreaDto> {
    try {
      const technicalArea = await this.findOne(i010i_area_tecnica);
      await this.repository.delete(i010i_area_tecnica);
      return new ResponseTechnicalAreaDto(technicalArea)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }
}
