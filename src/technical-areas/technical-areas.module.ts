import { Module } from '@nestjs/common';
import { TechnicalAreasService } from './technical-areas.service';
import { TechnicalAreasController } from './technical-areas.controller';

@Module({
  controllers: [TechnicalAreasController],
  providers: [TechnicalAreasService],
})
export class TechnicalAreasModule {}
