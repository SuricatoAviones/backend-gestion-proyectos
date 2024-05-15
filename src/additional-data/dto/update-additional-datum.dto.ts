import { PartialType } from '@nestjs/swagger';
import { CreateAdditionalDatumDto } from './create-additional-datum.dto';

export class UpdateAdditionalDatumDto extends PartialType(CreateAdditionalDatumDto) {}
