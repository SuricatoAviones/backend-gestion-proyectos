import { Module } from '@nestjs/common';
import { TechnicalAreasService } from './technical-areas.service';
import { TechnicalAreasController } from './technical-areas.controller';
import { TechnicalArea } from './entities/technical-area.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalArea])],
  controllers: [TechnicalAreasController],
  providers: [TechnicalAreasService],
})
export class TechnicalAreasModule {}
