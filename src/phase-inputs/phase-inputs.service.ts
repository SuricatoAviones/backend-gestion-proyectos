import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhaseInputDto } from './dto/create-phase-input.dto';
import { UpdatePhaseInputDto } from './dto/update-phase-input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhaseInput } from './entities/phase-input.entity';
import { ResponsePhaseInputDto } from './dto/response-phase-input.dto';

@Injectable()
export class PhaseInputsService {

  constructor(@InjectRepository(PhaseInput)
  private repository: Repository<PhaseInput>){

  }

  async create(createPhaseInputDto: CreatePhaseInputDto): Promise<ResponsePhaseInputDto> {
    try {
      const phaseInput = this.repository.create({
        in_nombre_fase: createPhaseInputDto.in_nombre_fase,
        tx_descripcion_fase: createPhaseInputDto.tx_descripcion_fase,
      })
      return new ResponsePhaseInputDto(await this.repository.save(phaseInput))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findAll(): Promise<Array<ResponsePhaseInputDto>> {
    try {
      const data = await this.repository.find();
      return data.map(phaseI => new ResponsePhaseInputDto(phaseI))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findOne(i0005i_fase_entrada: number): Promise<ResponsePhaseInputDto> {
    try {
      const phaseInput = await this.repository.findOne({
        where: {
          i0005i_fase_entrada,
        }
      });
      if (!phaseInput) throw new NotFoundException();
      return new ResponsePhaseInputDto(phaseInput)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async update( i0005i_fase_entrada: number, updatePhaseInputDto: UpdatePhaseInputDto): Promise<UpdatePhaseInputDto> {
    try {
      const phaseInput = await this.repository.update(i0005i_fase_entrada, {
        in_nombre_fase: updatePhaseInputDto.in_nombre_fase,
        tx_descripcion_fase: updatePhaseInputDto.tx_descripcion_fase
      })
      return new UpdatePhaseInputDto(phaseInput);
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async remove(i0005i_fase_entrada: number): Promise<ResponsePhaseInputDto> {
    try {
      const phaseInput = await this.findOne(i0005i_fase_entrada);
      await this.repository.delete(i0005i_fase_entrada);
      return new ResponsePhaseInputDto(phaseInput)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }
}
