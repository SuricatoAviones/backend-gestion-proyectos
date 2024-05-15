import { Injectable } from '@nestjs/common';
import { CreateAdditionalDatumDto } from './dto/create-additional-datum.dto';
import { UpdateAdditionalDatumDto } from './dto/update-additional-datum.dto';

@Injectable()
export class AdditionalDataService {
  create(createAdditionalDatumDto: CreateAdditionalDatumDto) {
    return 'This action adds a new additionalDatum';
  }

  findAll() {
    return `This action returns all additionalData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} additionalDatum`;
  }

  update(id: number, updateAdditionalDatumDto: UpdateAdditionalDatumDto) {
    return `This action updates a #${id} additionalDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} additionalDatum`;
  }
}
