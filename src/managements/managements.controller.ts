import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagementsService } from './managements.service';
import { CreateManagementDto } from './dto/create-management.dto';
import { UpdateManagementDto } from './dto/update-management.dto';

@Controller('managements')
export class ManagementsController {
  constructor(private readonly managementsService: ManagementsService) {}

  @Post()
  create(@Body() createManagementDto: CreateManagementDto) {
    return this.managementsService.create(createManagementDto);
  }

  @Get()
  findAll() {
    return this.managementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagementDto: UpdateManagementDto) {
    return this.managementsService.update(+id, updateManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managementsService.remove(+id);
  }
}
