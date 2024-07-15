import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusTaskDto } from './dto/create-status-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseStatusTaskDto } from './dto/response-status-task.dto';
import { StatusTask } from './entities/status-task.entity';
@Injectable()
export class StatusTaskService {
  constructor(@InjectRepository(StatusTask)
  private repository: Repository<StatusTask>){

  }

  async create(createStatusTaskDto: CreateStatusTaskDto): Promise<CreateStatusTaskDto> {
    
    try {
      const statusTask = this.repository.create({
        in_titulo: createStatusTaskDto.in_titulo,
        tx_descripcion: createStatusTaskDto.tx_descripcion
      })
      return new ResponseStatusTaskDto(await this.repository.save(statusTask))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findAll(): Promise<Array<ResponseStatusTaskDto>> {
    try {
      const data = await this.repository.find();
      return data.map(statTast => new ResponseStatusTaskDto(statTast))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findOne(i015i_estado_tarea: number): Promise<ResponseStatusTaskDto> {
    try {
      const statusTask = await this.repository.findOne({
        where: {
          i015i_estado_tarea,
        }
      });
      if (!statusTask) throw new NotFoundException();
      return new ResponseStatusTaskDto(statusTask)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async update(i012i_fase_proyecto: number, updateStatusTaskDto: UpdateStatusTaskDto): Promise<UpdateStatusTaskDto> {
    try {
      const statusTask = await this.repository.update(i012i_fase_proyecto, {
        in_titulo: updateStatusTaskDto.in_titulo,
        tx_descripcion: updateStatusTaskDto.tx_descripcion
      })
      return new UpdateStatusTaskDto(statusTask);
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async remove(i015i_estado_tarea: number): Promise<ResponseStatusTaskDto> {
    try {
      const statusTask = await this.findOne(i015i_estado_tarea);
      await this.repository.delete(i015i_estado_tarea);
      return new ResponseStatusTaskDto(statusTask)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }
}
