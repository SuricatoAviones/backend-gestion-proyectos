import { Module } from '@nestjs/common';
import { TypeProjectsService } from './type-projects.service';
import { TypeProjectsController } from './type-projects.controller';
import { TypeProject } from './entities/type-project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsPhase } from 'src/projects-phase/entities/projects-phase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeProject, ProjectsPhase,])],
  controllers: [TypeProjectsController],
  providers: [TypeProjectsService],
})
export class TypeProjectsModule {}
