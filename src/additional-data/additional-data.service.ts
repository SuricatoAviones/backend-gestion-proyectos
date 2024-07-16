import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdditionalDatumDto } from './dto/create-additional-datum.dto';
import { UpdateAdditionalDatumDto } from './dto/update-additional-datum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseAdditionalDatumDto } from './dto/response-additional-datum.dto';
import { AdditionalDatum } from './entities/additional-datum.entity';
@Injectable()
export class AdditionalDataService {
  constructor(@InjectRepository(AdditionalDatum)
  private repository: Repository<AdditionalDatum>){

  }

  async create(createAdditionalDatumDto: CreateAdditionalDatumDto): Promise<CreateAdditionalDatumDto> {
    
    try {
      const additionalDatum = this.repository.create({
        tx_interfaz: createAdditionalDatumDto.tx_interfaz,
        tx_interconexion: createAdditionalDatumDto.tx_interconexion,
        tx_datamodelo: createAdditionalDatumDto.tx_datamodelo,
        tx_seguridad: createAdditionalDatumDto.tx_seguridad,
        tx_comentario: createAdditionalDatumDto.tx_comentario,
      })
      return new ResponseAdditionalDatumDto(await this.repository.save(additionalDatum))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findAll(): Promise<Array<ResponseAdditionalDatumDto>> {
    try {
      const data = await this.repository.find();
      return data.map(aDatum => new ResponseAdditionalDatumDto(aDatum))
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(i004i_datos_adi: number): Promise<ResponseAdditionalDatumDto> {
    try {
      const additionalDatum = await this.repository.findOne({
        where: {
          i004i_datos_adi,
        }
      });
      if (!additionalDatum) throw new NotFoundException();
      return new ResponseAdditionalDatumDto(additionalDatum)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async update(i004i_datos_adi: number, updateAdditionalDatumDto: UpdateAdditionalDatumDto): Promise<UpdateAdditionalDatumDto> {
    try {
      const additionalDatum = await this.repository.update(i004i_datos_adi, {
        tx_interfaz: updateAdditionalDatumDto.tx_interfaz,
        tx_interconexion: updateAdditionalDatumDto.tx_interconexion,
        tx_datamodelo: updateAdditionalDatumDto.tx_datamodelo,
        tx_seguridad: updateAdditionalDatumDto.tx_seguridad,
        tx_comentario: updateAdditionalDatumDto.tx_comentario,
      })
      return this.findOne(i004i_datos_adi)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async remove(i004i_datos_adi: number): Promise<ResponseAdditionalDatumDto> {
    try {
      const additionalDatum = await this.findOne(i004i_datos_adi);
      await this.repository.delete(i004i_datos_adi);
      return new ResponseAdditionalDatumDto(additionalDatum)
    } catch (error) {
           throw new BadRequestException(error)

    }
  }
}
