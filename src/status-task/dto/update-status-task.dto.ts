import { PartialType } from '@nestjs/swagger';
import { CreateStatusTaskDto } from './create-status-task.dto';

export class UpdateStatusTaskDto extends PartialType(CreateStatusTaskDto) {}
