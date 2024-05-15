import { Injectable } from '@nestjs/common';
import { CreateInputStatusDto } from './dto/create-input-status.dto';
import { UpdateInputStatusDto } from './dto/update-input-status.dto';

@Injectable()
export class InputStatusService {
  create(createInputStatusDto: CreateInputStatusDto) {
    return 'This action adds a new inputStatus';
  }

  findAll() {
    return `This action returns all inputStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inputStatus`;
  }

  update(id: number, updateInputStatusDto: UpdateInputStatusDto) {
    return `This action updates a #${id} inputStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} inputStatus`;
  }
}
