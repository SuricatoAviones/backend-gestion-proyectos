import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { StatusTask } from './entities/status-task.entity';
import { CreateStatusTaskDto } from './dto/create-status-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status-task.dto';
import { ResponseStatusTaskDto } from './dto/response-status-task.dto';

@Injectable()
export class StatusTaskService {
  constructor(
    @InjectRepository(StatusTask)
    private repository: Repository<StatusTask>,
    private dataSource: DataSource,
  ) {}

  async create(
    createStatusTaskDto: CreateStatusTaskDto,
  ): Promise<ResponseStatusTaskDto> {
    return this.dataSource.transaction(async (manager) => {
      const statusTask = manager.create(StatusTask, {
        in_titulo: createStatusTaskDto.in_titulo,
        tx_descripcion: createStatusTaskDto.tx_descripcion,
      });
      return new ResponseStatusTaskDto(await manager.save(statusTask));
    });
  }

  async findAll(): Promise<Array<ResponseStatusTaskDto>> {
    const data = await this.repository.find();
    return data.map((statTast) => new ResponseStatusTaskDto(statTast));
  }

  async findOne(i015i_estado_tarea: number): Promise<ResponseStatusTaskDto> {
    const statusTask = await this.repository.findOne({
      where: {
        i015i_estado_tarea,
      },
    });
    if (!statusTask) throw new NotFoundException();
    return new ResponseStatusTaskDto(statusTask);
  }

  async update(
    i012i_fase_proyecto: number,
    updateStatusTaskDto: UpdateStatusTaskDto,
  ): Promise<UpdateStatusTaskDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(StatusTask, i012i_fase_proyecto, {
        in_titulo: updateStatusTaskDto.in_titulo,
        tx_descripcion: updateStatusTaskDto.tx_descripcion,
      });
      const statusTask = await manager.findOne(StatusTask, {
        where: { i015i_estado_tarea: i012i_fase_proyecto },
      });
      if (!statusTask) throw new NotFoundException();
      return new ResponseStatusTaskDto(statusTask);
    });
  }

  async remove(i015i_estado_tarea: number): Promise<ResponseStatusTaskDto> {
    return this.dataSource.transaction(async (manager) => {
      const statusTask = await manager.findOne(StatusTask, {
        where: { i015i_estado_tarea },
      });
      if (!statusTask) throw new NotFoundException();
      await manager.delete(StatusTask, i015i_estado_tarea);
      return new ResponseStatusTaskDto(statusTask);
    });
  }
}
