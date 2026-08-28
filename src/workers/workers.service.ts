import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { Worker } from './entities/worker.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { ResponseWorkerDto } from './dto/response-worker.dto';

@Injectable()
export class WorkersService {
  constructor(
    @InjectRepository(Worker)
    private repository: Repository<Worker>,
    private dataSource: DataSource,
  ) {}

  private qbWorker(qb: SelectQueryBuilder<Worker>): SelectQueryBuilder<Worker> {
    return qb
      .leftJoinAndSelect('worker.i017f_c008t_equipo_trabajo', 'equipo')
      .leftJoinAndSelect('equipo.c008f_i001t_lider_funcional', 'lf')
      .leftJoinAndSelect('equipo.c008f_i001t_lider_negocio', 'ln')
      .leftJoinAndSelect('equipo.c008f_i001t_lider_tecnico', 'lt')
      .leftJoinAndSelect('equipo.c008f_i009t_gerencia_funcional', 'gf')
      .leftJoinAndSelect('equipo.c008f_i009t_gerencia_galba', 'gg')
      .leftJoinAndSelect('equipo.c008f_i009t_gerencia_tecnica', 'gt')
      .leftJoinAndSelect('equipo.c008f_i001t_trabajador', 'tr');
  }

  async create(createWorkerDto: CreateWorkerDto): Promise<ResponseWorkerDto> {
    return this.dataSource.transaction(async (manager) => {
      const worker = manager.create(Worker, {
        in_nombre: createWorkerDto.in_nombre,
        tx_cargo: createWorkerDto.tx_cargo,
        i017f_c008t_equipo_trabajo: createWorkerDto.i017f_c008t_equipo_trabajo,
      });
      return new ResponseWorkerDto(await manager.save(worker));
    });
  }

  async findAll(): Promise<Array<ResponseWorkerDto>> {
    const data = await this.qbWorker(
      this.repository.createQueryBuilder('worker'),
    ).getMany();
    return data.map((worker) => new ResponseWorkerDto(worker));
  }

  async findOne(i017i_trabajador: number): Promise<ResponseWorkerDto> {
    const worker = await this.qbWorker(
      this.repository.createQueryBuilder('worker'),
    )
      .where('worker.i017i_trabajador = :id', { id: i017i_trabajador })
      .getOne();
    if (!worker) throw new NotFoundException();
    return new ResponseWorkerDto(worker);
  }

  async update(
    i017i_trabajador: number,
    updateWorkerDto: UpdateWorkerDto,
  ): Promise<UpdateWorkerDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(Worker, i017i_trabajador, {
        in_nombre: updateWorkerDto.in_nombre,
        tx_cargo: updateWorkerDto.tx_cargo,
        i017f_c008t_equipo_trabajo: updateWorkerDto.i017f_c008t_equipo_trabajo,
      });
      const worker = await this.qbWorker(
        manager.createQueryBuilder(Worker, 'worker'),
      )
        .where('worker.i017i_trabajador = :id', { id: i017i_trabajador })
        .getOne();
      if (!worker) throw new NotFoundException();
      return new ResponseWorkerDto(worker);
    });
  }

  async remove(i017i_trabajador: number): Promise<ResponseWorkerDto> {
    return this.dataSource.transaction(async (manager) => {
      const worker = await this.qbWorker(
        manager.createQueryBuilder(Worker, 'worker'),
      )
        .where('worker.i017i_trabajador = :id', { id: i017i_trabajador })
        .getOne();
      if (!worker) throw new NotFoundException();
      await manager.delete(Worker, i017i_trabajador);
      return new ResponseWorkerDto(worker);
    });
  }
}
