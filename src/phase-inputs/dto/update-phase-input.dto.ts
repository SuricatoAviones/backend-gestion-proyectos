import { PartialType } from '@nestjs/swagger';
import { CreatePhaseInputDto } from './create-phase-input.dto';

export class UpdatePhaseInputDto extends PartialType(CreatePhaseInputDto) {}
