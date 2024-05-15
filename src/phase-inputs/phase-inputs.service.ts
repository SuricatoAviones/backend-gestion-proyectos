import { Injectable } from '@nestjs/common';
import { CreatePhaseInputDto } from './dto/create-phase-input.dto';
import { UpdatePhaseInputDto } from './dto/update-phase-input.dto';

@Injectable()
export class PhaseInputsService {
  create(createPhaseInputDto: CreatePhaseInputDto) {
    return 'This action adds a new phaseInput';
  }

  findAll() {
    return `This action returns all phaseInputs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phaseInput`;
  }

  update(id: number, updatePhaseInputDto: UpdatePhaseInputDto) {
    return `This action updates a #${id} phaseInput`;
  }

  remove(id: number) {
    return `This action removes a #${id} phaseInput`;
  }
}
