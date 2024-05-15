import { PartialType } from '@nestjs/swagger';
import { CreateTechnicalAreaDto } from './create-technical-area.dto';

export class UpdateTechnicalAreaDto extends PartialType(CreateTechnicalAreaDto) {}
