import { Injectable } from '@nestjs/common';
import { CreateProjectsPhaseDto } from './dto/create-projects-phase.dto';
import { UpdateProjectsPhaseDto } from './dto/update-projects-phase.dto';

@Injectable()
export class ProjectsPhaseService {
  create(createProjectsPhaseDto: CreateProjectsPhaseDto) {
    return 'This action adds a new projectsPhase';
  }

  findAll() {
    return `This action returns all projectsPhase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectsPhase`;
  }

  update(id: number, updateProjectsPhaseDto: UpdateProjectsPhaseDto) {
    return `This action updates a #${id} projectsPhase`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectsPhase`;
  }
}
