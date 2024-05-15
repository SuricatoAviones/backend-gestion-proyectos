import { PartialType } from '@nestjs/swagger';
import { CreateInputStatusDto } from './create-input-status.dto';

export class UpdateInputStatusDto extends PartialType(CreateInputStatusDto) {}
