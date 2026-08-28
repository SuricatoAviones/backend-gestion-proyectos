import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PhaseInput } from './entities/phase-input.entity';
import { CreatePhaseInputDto } from './dto/create-phase-input.dto';
import { UpdatePhaseInputDto } from './dto/update-phase-input.dto';
import { ResponsePhaseInputDto } from './dto/response-phase-input.dto';

@Injectable()
export class PhaseInputsService {
  constructor(
    @InjectRepository(PhaseInput)
    private repository: Repository<PhaseInput>,
    private dataSource: DataSource,
  ) {}

  async create(
    createPhaseInputDto: CreatePhaseInputDto,
  ): Promise<ResponsePhaseInputDto> {
    return this.dataSource.transaction(async (manager) => {
      const phaseInput = manager.create(PhaseInput, {
        in_nombre_fase: createPhaseInputDto.in_nombre_fase,
        tx_descripcion_fase: createPhaseInputDto.tx_descripcion_fase,
      });
      return new ResponsePhaseInputDto(await manager.save(phaseInput));
    });
  }

  async findAll(): Promise<Array<ResponsePhaseInputDto>> {
    const data = await this.repository.find();
    return data.map((phaseI) => new ResponsePhaseInputDto(phaseI));
  }

  async findOne(i0005i_fase_entrada: number): Promise<ResponsePhaseInputDto> {
    const phaseInput = await this.repository.findOne({
      where: {
        i0005i_fase_entrada,
      },
    });
    if (!phaseInput) throw new NotFoundException();
    return new ResponsePhaseInputDto(phaseInput);
  }

  async update(
    i0005i_fase_entrada: number,
    updatePhaseInputDto: UpdatePhaseInputDto,
  ): Promise<UpdatePhaseInputDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(PhaseInput, i0005i_fase_entrada, {
        in_nombre_fase: updatePhaseInputDto.in_nombre_fase,
        tx_descripcion_fase: updatePhaseInputDto.tx_descripcion_fase,
      });
      const phaseInput = await manager.findOne(PhaseInput, {
        where: { i0005i_fase_entrada },
      });
      if (!phaseInput) throw new NotFoundException();
      return new ResponsePhaseInputDto(phaseInput);
    });
  }

  async remove(i0005i_fase_entrada: number): Promise<ResponsePhaseInputDto> {
    return this.dataSource.transaction(async (manager) => {
      const phaseInput = await manager.findOne(PhaseInput, {
        where: { i0005i_fase_entrada },
      });
      if (!phaseInput) throw new NotFoundException();
      await manager.delete(PhaseInput, i0005i_fase_entrada);
      return new ResponsePhaseInputDto(phaseInput);
    });
  }
}
