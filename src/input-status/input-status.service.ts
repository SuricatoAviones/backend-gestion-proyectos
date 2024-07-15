import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInputStatusDto } from './dto/create-input-status.dto';
import { UpdateInputStatusDto } from './dto/update-input-status.dto';
import { InputStatus } from './entities/input-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { ResponseInputStatusDto } from './dto/response-input-status.dto';
@Injectable()
export class InputStatusService {

  constructor(@InjectRepository(InputStatus)
  private repository: Repository<InputStatus>){

  }

  async create(createInputStatusDto: CreateInputStatusDto): Promise<CreateInputStatusDto> {
    try {
      const inputStatus = this.repository.create({
        in_nombre_estado: createInputStatusDto.in_nombre_estado,
        tx_descripcion_estado: createInputStatusDto.tx_descripcion_estado
      })

      return new ResponseInputStatusDto(await this.repository.save(inputStatus))
    } catch (error) {
           throw new BadRequestException(error)
;
    }
  }

  async findAll(): Promise<Array<ResponseInputStatusDto>> {
    try {
      const inputStatus = await this.repository.find();
      return inputStatus.map(is => new ResponseInputStatusDto(is))
    } catch (error) {
           throw new BadRequestException(error)
;
    }
  }

  async findOne(i006i_estado_entrada: number): Promise<ResponseInputStatusDto> {
    try {
      const inputStatus = await this.repository.findOne({ where: {
        i006i_estado_entrada,
      }});
      if (!inputStatus) throw new NotFoundException();
      return new ResponseInputStatusDto(inputStatus);
    } catch (error) {
           throw new BadRequestException(error)
;
    }
  }

  async update(i006i_estado_entrada: number, updateInputStatusDto: UpdateInputStatusDto) {
    try {
      const inputStatus = await this.repository.update(i006i_estado_entrada, {
        in_nombre_estado: updateInputStatusDto.in_nombre_estado,
        tx_descripcion_estado: updateInputStatusDto.tx_descripcion_estado
      })
      return new UpdateInputStatusDto(inputStatus)
    } catch (error) {
           throw new BadRequestException(error)
;
    }
  }

  async remove(i006i_estado_entrada: number): Promise<ResponseInputStatusDto> {
    try {
      const inputStatus = await this.findOne(i006i_estado_entrada);
      await this.repository.delete(i006i_estado_entrada);
      return inputStatus
    } catch (error) {
           throw new BadRequestException(error)
;
    }
  }
}
