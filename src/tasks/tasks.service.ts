import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseTaskDto } from './dto/response-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task)
  private repository: Repository<Task>){

  }

  async create(createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    
    try {
      const task = this.repository.create({
        description: createTaskDto.description,
        tx_descripcion: createTaskDto.tx_descripcion,
        i013f_i001t_usuario: createTaskDto.i013f_i001t_usuario,
        i013f_i003t_entrada: createTaskDto.i013f_i003t_entrada
      })
      return new ResponseTaskDto(await this.repository.save(task))
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll(): Promise<Array<ResponseTaskDto>> {
    try {
      const data = await this.repository.find({
        relations: {
          i013f_i003t_entrada: true,
        }
      });
      return data.map(projectP => new ResponseTaskDto(projectP))
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findOne(i013i_tarea: number): Promise<ResponseTaskDto> {
    try {
      const task = await this.repository.findOne({
        where: {
          i013i_tarea,
        },
        relations: {
          i013f_i003t_entrada: true,
        }
      });
      if (!task) throw new NotFoundException();
      return new ResponseTaskDto(task)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async update(i013i_tarea: number, updateTaskDto: UpdateTaskDto): Promise<UpdateTaskDto> {
    try {
      const task = await this.repository.update(i013i_tarea, {
        description: updateTaskDto.description,
        tx_descripcion: updateTaskDto.tx_descripcion,
        i013f_i001t_usuario: updateTaskDto.i013f_i001t_usuario,
        i013f_i003t_entrada: updateTaskDto.i013f_i003t_entrada,
      })
      return new UpdateTaskDto(task);
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(i013i_tarea: number): Promise<ResponseTaskDto> {
    try {
      const task = await this.findOne(i013i_tarea);
      await this.repository.delete(i013i_tarea);
      return new ResponseTaskDto(task)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
