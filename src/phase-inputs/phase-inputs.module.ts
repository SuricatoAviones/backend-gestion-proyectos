import { Module } from '@nestjs/common';
import { PhaseInputsService } from './phase-inputs.service';
import { PhaseInputsController } from './phase-inputs.controller';

@Module({
  controllers: [PhaseInputsController],
  providers: [PhaseInputsService],
})
export class PhaseInputsModule {}
