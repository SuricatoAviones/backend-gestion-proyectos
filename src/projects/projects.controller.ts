import { Controller, Get, Post, Body, Patch, Param, Delete, StreamableFile, Res, Header } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Proyectos')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Header('Content-type', 'application/pdf')
  @ApiResponse({ status: 200, description: 'PDF file' })
  @Get('reports/:id')
  async printSingle(@Param('id') id: string) {
    return this.projectsService.printOne(+id);

  }


  @Get('reports/many/:id')
  async printMany(@Param('id') id: string) {
    return this.projectsService.printMany(+id);
 
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
