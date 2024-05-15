import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsPhaseService } from './projects-phase.service';
import { CreateProjectsPhaseDto } from './dto/create-projects-phase.dto';
import { UpdateProjectsPhaseDto } from './dto/update-projects-phase.dto';

@Controller('projects-phase')
export class ProjectsPhaseController {
  constructor(private readonly projectsPhaseService: ProjectsPhaseService) {}

  @Post()
  create(@Body() createProjectsPhaseDto: CreateProjectsPhaseDto) {
    return this.projectsPhaseService.create(createProjectsPhaseDto);
  }

  @Get()
  findAll() {
    return this.projectsPhaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsPhaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectsPhaseDto: UpdateProjectsPhaseDto) {
    return this.projectsPhaseService.update(+id, updateProjectsPhaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsPhaseService.remove(+id);
  }
}
