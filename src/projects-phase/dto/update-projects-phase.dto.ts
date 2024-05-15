import { PartialType } from '@nestjs/swagger';
import { CreateProjectsPhaseDto } from './create-projects-phase.dto';

export class UpdateProjectsPhaseDto extends PartialType(CreateProjectsPhaseDto) {}
