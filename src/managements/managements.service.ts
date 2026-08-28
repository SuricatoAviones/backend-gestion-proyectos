import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Management } from './entities/management.entity';
import { CreateManagementDto } from './dto/create-management.dto';
import { UpdateManagementDto } from './dto/update-management.dto';
import { ResponseManagementDto } from './dto/response-management.dto';

@Injectable()
export class ManagementsService {
  constructor(
    @InjectRepository(Management)
    private repository: Repository<Management>,
    private dataSource: DataSource,
  ) {}

  async create(
    createManagementDto: CreateManagementDto,
  ): Promise<ResponseManagementDto> {
    return this.dataSource.transaction(async (manager) => {
      const management = manager.create(Management, {
        in_nombre: createManagementDto.in_nombre,
        tx_descripcion: createManagementDto.tx_descripcion,
      });
      return new ResponseManagementDto(await manager.save(management));
    });
  }

  async findAll(): Promise<Array<ResponseManagementDto>> {
    const data = await this.repository.find();
    return data.map((mgmt) => new ResponseManagementDto(mgmt));
  }

  async findOne(i009i_gerencia: number): Promise<ResponseManagementDto> {
    const management = await this.repository.findOne({
      where: {
        i009i_gerencia,
      },
    });
    if (!management) throw new NotFoundException();
    return new ResponseManagementDto(management);
  }

  async update(
    i009i_gerencia: number,
    updateManagementDto: UpdateManagementDto,
  ): Promise<UpdateManagementDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(Management, i009i_gerencia, {
        in_nombre: updateManagementDto.in_nombre,
        tx_descripcion: updateManagementDto.tx_descripcion,
      });
      const management = await manager.findOne(Management, {
        where: { i009i_gerencia },
      });
      if (!management) throw new NotFoundException();
      return new ResponseManagementDto(management);
    });
  }

  async remove(i009i_gerencia: number): Promise<ResponseManagementDto> {
    return this.dataSource.transaction(async (manager) => {
      const management = await manager.findOne(Management, {
        where: { i009i_gerencia },
      });
      if (!management) throw new NotFoundException();
      await manager.delete(Management, i009i_gerencia);
      return new ResponseManagementDto(management);
    });
  }
}
