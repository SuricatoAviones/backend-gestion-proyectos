import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagementDto } from './dto/create-management.dto';
import { UpdateManagementDto } from './dto/update-management.dto';
import { ResponseManagementDto } from './dto/response-management.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Management } from './entities/management.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ManagementsService {
  constructor(
    @InjectRepository(Management)
    private repository: Repository<Management>,
  ) {}

  async create(
    createManagementDto: CreateManagementDto,
  ): Promise<ResponseManagementDto> {
    const management = this.repository.create({
      in_nombre: createManagementDto.in_nombre,
      tx_descripcion: createManagementDto.tx_descripcion,
    });
    return new ResponseManagementDto(await this.repository.save(management));
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
    await this.repository.update(i009i_gerencia, {
      in_nombre: updateManagementDto.in_nombre,
      tx_descripcion: updateManagementDto.tx_descripcion,
    });
    return this.findOne(i009i_gerencia);
  }

  async remove(i009i_gerencia: number): Promise<ResponseManagementDto> {
    const management = await this.findOne(i009i_gerencia);
    await this.repository.delete(i009i_gerencia);
    return management;
  }
}
