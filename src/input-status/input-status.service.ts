import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { InputStatus } from './entities/input-status.entity';
import { CreateInputStatusDto } from './dto/create-input-status.dto';
import { UpdateInputStatusDto } from './dto/update-input-status.dto';
import { ResponseInputStatusDto } from './dto/response-input-status.dto';

@Injectable()
export class InputStatusService {
  constructor(
    @InjectRepository(InputStatus)
    private repository: Repository<InputStatus>,
    private dataSource: DataSource,
  ) {}

  async create(
    createInputStatusDto: CreateInputStatusDto,
  ): Promise<CreateInputStatusDto> {
    return this.dataSource.transaction(async (manager) => {
      const inputStatus = manager.create(InputStatus, {
        in_nombre_estado: createInputStatusDto.in_nombre_estado,
        tx_descripcion_estado: createInputStatusDto.tx_descripcion_estado,
      });

      return new ResponseInputStatusDto(await manager.save(inputStatus));
    });
  }

  async findAll(): Promise<Array<ResponseInputStatusDto>> {
    const inputStatus = await this.repository.find();
    return inputStatus.map((is) => new ResponseInputStatusDto(is));
  }

  async findOne(i006i_estado_entrada: number): Promise<ResponseInputStatusDto> {
    const inputStatus = await this.repository.findOne({
      where: {
        i006i_estado_entrada,
      },
    });
    if (!inputStatus) throw new NotFoundException();
    return new ResponseInputStatusDto(inputStatus);
  }

  async update(
    i006i_estado_entrada: number,
    updateInputStatusDto: UpdateInputStatusDto,
  ) {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(InputStatus, i006i_estado_entrada, {
        in_nombre_estado: updateInputStatusDto.in_nombre_estado,
        tx_descripcion_estado: updateInputStatusDto.tx_descripcion_estado,
      });
      const inputStatus = await manager.findOne(InputStatus, {
        where: { i006i_estado_entrada },
      });
      if (!inputStatus) throw new NotFoundException();
      return new ResponseInputStatusDto(inputStatus);
    });
  }

  async remove(i006i_estado_entrada: number): Promise<ResponseInputStatusDto> {
    return this.dataSource.transaction(async (manager) => {
      const inputStatus = await manager.findOne(InputStatus, {
        where: { i006i_estado_entrada },
      });
      if (!inputStatus) throw new NotFoundException();
      await manager.delete(InputStatus, i006i_estado_entrada);
      return new ResponseInputStatusDto(inputStatus);
    });
  }
}
