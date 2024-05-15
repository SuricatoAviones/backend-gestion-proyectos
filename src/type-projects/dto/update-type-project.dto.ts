import { PartialType } from '@nestjs/swagger';
import { CreateTypeProjectDto } from './create-type-project.dto';

export class UpdateTypeProjectDto extends PartialType(CreateTypeProjectDto) {}
