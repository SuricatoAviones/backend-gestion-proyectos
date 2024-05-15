import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeProjectsService } from './type-projects.service';
import { CreateTypeProjectDto } from './dto/create-type-project.dto';
import { UpdateTypeProjectDto } from './dto/update-type-project.dto';

@Controller('type-projects')
export class TypeProjectsController {
  constructor(private readonly typeProjectsService: TypeProjectsService) {}

  @Post()
  create(@Body() createTypeProjectDto: CreateTypeProjectDto) {
    return this.typeProjectsService.create(createTypeProjectDto);
  }

  @Get()
  findAll() {
    return this.typeProjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeProjectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeProjectDto: UpdateTypeProjectDto) {
    return this.typeProjectsService.update(+id, updateTypeProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeProjectsService.remove(+id);
  }
}
