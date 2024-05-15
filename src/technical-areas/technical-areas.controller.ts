import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnicalAreasService } from './technical-areas.service';
import { CreateTechnicalAreaDto } from './dto/create-technical-area.dto';
import { UpdateTechnicalAreaDto } from './dto/update-technical-area.dto';

@Controller('technical-areas')
export class TechnicalAreasController {
  constructor(private readonly technicalAreasService: TechnicalAreasService) {}

  @Post()
  create(@Body() createTechnicalAreaDto: CreateTechnicalAreaDto) {
    return this.technicalAreasService.create(createTechnicalAreaDto);
  }

  @Get()
  findAll() {
    return this.technicalAreasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalAreasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTechnicalAreaDto: UpdateTechnicalAreaDto) {
    return this.technicalAreasService.update(+id, updateTechnicalAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalAreasService.remove(+id);
  }
}
