import { Module } from '@nestjs/common';
import { ProjectsPhaseService } from './projects-phase.service';
import { ProjectsPhaseController } from './projects-phase.controller';
import { ProjectsPhase } from './entities/projects-phase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsPhase])],
  controllers: [ProjectsPhaseController],
  providers: [ProjectsPhaseService],
})
export class ProjectsPhaseModule {}
