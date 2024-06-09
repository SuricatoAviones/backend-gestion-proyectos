import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';
import { ResponseWorkerDto } from './dto/response-worker.dto';

@Injectable()
export class WorkersService {
  constructor(@InjectRepository(Worker)
  private repository: Repository<Worker>){

  }

  async create(createWorkerDto: CreateWorkerDto): Promise<CreateWorkerDto> {
    
    try {
      const worker = this.repository.create({
        in_nombre: createWorkerDto.in_nombre,
        tx_cargo: createWorkerDto.tx_cargo,
        i017f_c008t_equipo_trabajo: createWorkerDto.i017f_c008t_equipo_trabajo
      })
      return new ResponseWorkerDto(await this.repository.save(worker))
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll(): Promise<Array<ResponseWorkerDto>> {
    try {
      const data = await this.repository.find({
        relations: {
          i017f_c008t_equipo_trabajo: true,
        }
      });
      return data.map(worker => new ResponseWorkerDto(worker))
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findOne(i017i_trabajador: number): Promise<ResponseWorkerDto> {
    try {
      const worker = await this.repository.findOne({
        where: {
          i017i_trabajador,
        }
      });
      if (!worker) throw new NotFoundException();
      return new ResponseWorkerDto(worker)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async update(i017i_trabajador: number, updateWorkerDto: UpdateWorkerDto): Promise<UpdateWorkerDto> {
    try {
      const worker = await this.repository.update(i017i_trabajador, {
        in_nombre: updateWorkerDto.in_nombre,
        tx_cargo: updateWorkerDto.tx_cargo,
        i017f_c008t_equipo_trabajo: updateWorkerDto.i017f_c008t_equipo_trabajo

      })
      return new UpdateWorkerDto(worker);
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(i017i_trabajador: number): Promise<ResponseWorkerDto> {
    try {
      const worker = await this.findOne(i017i_trabajador);
      await this.repository.delete(i017i_trabajador);
      return new ResponseWorkerDto(worker)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
