import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { AdditionalDatum } from './entities/additional-datum.entity';
import { CreateAdditionalDatumDto } from './dto/create-additional-datum.dto';
import { UpdateAdditionalDatumDto } from './dto/update-additional-datum.dto';
import { ResponseAdditionalDatumDto } from './dto/response-additional-datum.dto';

@Injectable()
export class AdditionalDataService {
  constructor(
    @InjectRepository(AdditionalDatum)
    private repository: Repository<AdditionalDatum>,
    private dataSource: DataSource,
  ) {}

  async create(
    createAdditionalDatumDto: CreateAdditionalDatumDto,
  ): Promise<CreateAdditionalDatumDto> {
    return this.dataSource.transaction(async (manager) => {
      const additionalDatum = manager.create(AdditionalDatum, {
        tx_interfaz: createAdditionalDatumDto.tx_interfaz,
        tx_interconexion: createAdditionalDatumDto.tx_interconexion,
        tx_datamodelo: createAdditionalDatumDto.tx_datamodelo,
        tx_seguridad: createAdditionalDatumDto.tx_seguridad,
        tx_comentario: createAdditionalDatumDto.tx_comentario,
      });
      return new ResponseAdditionalDatumDto(
        await manager.save(additionalDatum),
      );
    });
  }

  async findAll(): Promise<Array<ResponseAdditionalDatumDto>> {
    const data = await this.repository.find();
    return data.map((aDatum) => new ResponseAdditionalDatumDto(aDatum));
  }

  async findOne(i004i_datos_adi: number): Promise<ResponseAdditionalDatumDto> {
    const additionalDatum = await this.repository.findOne({
      where: {
        i004i_datos_adi,
      },
    });
    if (!additionalDatum) throw new NotFoundException();
    return new ResponseAdditionalDatumDto(additionalDatum);
  }

  async update(
    i004i_datos_adi: number,
    updateAdditionalDatumDto: UpdateAdditionalDatumDto,
  ): Promise<UpdateAdditionalDatumDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(AdditionalDatum, i004i_datos_adi, {
        tx_interfaz: updateAdditionalDatumDto.tx_interfaz,
        tx_interconexion: updateAdditionalDatumDto.tx_interconexion,
        tx_datamodelo: updateAdditionalDatumDto.tx_datamodelo,
        tx_seguridad: updateAdditionalDatumDto.tx_seguridad,
        tx_comentario: updateAdditionalDatumDto.tx_comentario,
      });
      const additionalDatum = await manager.findOne(AdditionalDatum, {
        where: { i004i_datos_adi },
      });
      if (!additionalDatum) throw new NotFoundException();
      return new ResponseAdditionalDatumDto(additionalDatum);
    });
  }

  async remove(i004i_datos_adi: number): Promise<ResponseAdditionalDatumDto> {
    return this.dataSource.transaction(async (manager) => {
      const additionalDatum = await manager.findOne(AdditionalDatum, {
        where: { i004i_datos_adi },
      });
      if (!additionalDatum) throw new NotFoundException();
      await manager.delete(AdditionalDatum, i004i_datos_adi);
      return new ResponseAdditionalDatumDto(additionalDatum);
    });
  }
}
