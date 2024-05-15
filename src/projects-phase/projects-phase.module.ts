import { Module } from '@nestjs/common';
import { ProjectsPhaseService } from './projects-phase.service';
import { ProjectsPhaseController } from './projects-phase.controller';

@Module({
  controllers: [ProjectsPhaseController],
  providers: [ProjectsPhaseService],
})
export class ProjectsPhaseModule {}
