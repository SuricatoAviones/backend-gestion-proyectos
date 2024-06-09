import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { TechnicalArea } from 'src/technical-areas/entities/technical-area.entity';
import { TypeProject } from 'src/type-projects/entities/type-project.entity';
import { Team } from 'src/teams/entities/team.entity';
import { ProjectsPhase } from 'src/projects-phase/entities/projects-phase.entity';
import { InputStatus } from 'src/input-status/entities/input-status.entity';
import { AdditionalDatum } from 'src/additional-data/entities/additional-datum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, TechnicalArea, TypeProject, Team, ProjectsPhase, InputStatus, AdditionalDatum])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
