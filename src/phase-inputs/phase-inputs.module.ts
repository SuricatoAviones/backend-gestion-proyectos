import { Module } from '@nestjs/common';
import { PhaseInputsService } from './phase-inputs.service';
import { PhaseInputsController } from './phase-inputs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhaseInput } from './entities/phase-input.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhaseInput])],
  controllers: [PhaseInputsController],
  providers: [PhaseInputsService],
})
export class PhaseInputsModule {}
