import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseTaskDto } from './dto/response-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
    private dataSource: DataSource,
  ) {}

  private qbTask(qb: SelectQueryBuilder<Task>): SelectQueryBuilder<Task> {
    return qb
      .leftJoinAndSelect('task.i013f_i003t_entrada', 'entrada')
      .leftJoinAndSelect('entrada.i003f_i011_tipo_proyecto', 'tipo')
      .leftJoinAndSelect('tipo.i011f_i012t_fase_proyecto', 'faseTipo')
      .leftJoinAndSelect('entrada.i003f_i005t_fase_entrada', 'faseEntrada')
      .leftJoinAndSelect('entrada.i003f_i010t_area_tecnica', 'area')
      .leftJoinAndSelect('entrada.i003f_i006t_estado_entrada', 'estado')
      .leftJoinAndSelect('entrada.i003f_i004t_datos_adi', 'datosAdi')
      .leftJoinAndSelect('task.i013f_i014t_seguimiento', 'seg');
  }

  async create(createTaskDto: CreateTaskDto): Promise<ResponseTaskDto> {
    return this.dataSource.transaction(async (manager) => {
      const task = manager.create(Task, {
        in_nombre: createTaskDto.in_nombre,
        tx_descripcion: createTaskDto.tx_descripcion,
        i013f_i001t_usuario: createTaskDto.i013f_i001t_usuario,
        i013f_i003t_entrada: createTaskDto.i013f_i003t_entrada,
        i013f_i014t_seguimiento: createTaskDto.i013f_i014t_seguimiento,
      });
      return new ResponseTaskDto(await manager.save(task));
    });
  }

  async findAll(): Promise<Array<ResponseTaskDto>> {
    const data = await this.qbTask(
      this.repository.createQueryBuilder('task'),
    ).getMany();
    return data.map((projectP) => new ResponseTaskDto(projectP));
  }

  async findOne(i013i_tarea: number): Promise<ResponseTaskDto> {
    const task = await this.qbTask(this.repository.createQueryBuilder('task'))
      .where('task.i013i_tarea = :id', { id: i013i_tarea })
      .getOne();
    if (!task) throw new NotFoundException();
    return new ResponseTaskDto(task);
  }

  async update(
    i013i_tarea: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(Task, i013i_tarea, {
        in_nombre: updateTaskDto.in_nombre,
        tx_descripcion: updateTaskDto.tx_descripcion,
        i013f_i001t_usuario: updateTaskDto.i013f_i001t_usuario,
        i013f_i003t_entrada: updateTaskDto.i013f_i003t_entrada,
        i013f_i014t_seguimiento: updateTaskDto.i013f_i014t_seguimiento,
      });
      const task = await this.qbTask(manager.createQueryBuilder(Task, 'task'))
        .where('task.i013i_tarea = :id', { id: i013i_tarea })
        .getOne();
      if (!task) throw new NotFoundException();
      return new ResponseTaskDto(task);
    });
  }

  async remove(i013i_tarea: number): Promise<ResponseTaskDto> {
    return this.dataSource.transaction(async (manager) => {
      const task = await this.qbTask(manager.createQueryBuilder(Task, 'task'))
        .where('task.i013i_tarea = :id', { id: i013i_tarea })
        .getOne();
      if (!task) throw new NotFoundException();
      await manager.delete(Task, i013i_tarea);
      return new ResponseTaskDto(task);
    });
  }
}
