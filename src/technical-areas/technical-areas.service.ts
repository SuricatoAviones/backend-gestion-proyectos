import { Injectable } from '@nestjs/common';
import { CreateTechnicalAreaDto } from './dto/create-technical-area.dto';
import { UpdateTechnicalAreaDto } from './dto/update-technical-area.dto';

@Injectable()
export class TechnicalAreasService {
  create(createTechnicalAreaDto: CreateTechnicalAreaDto) {
    return 'This action adds a new technicalArea';
  }

  findAll() {
    return `This action returns all technicalAreas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technicalArea`;
  }

  update(id: number, updateTechnicalAreaDto: UpdateTechnicalAreaDto) {
    return `This action updates a #${id} technicalArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} technicalArea`;
  }
}
