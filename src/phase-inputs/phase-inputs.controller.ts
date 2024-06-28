import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhaseInputsService } from './phase-inputs.service';
import { CreatePhaseInputDto } from './dto/create-phase-input.dto';
import { UpdatePhaseInputDto } from './dto/update-phase-input.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Fase de Entradas')
@ApiBearerAuth()
@Controller('phase-inputs')
export class PhaseInputsController {
  constructor(private readonly phaseInputsService: PhaseInputsService) {}

  @Post()
  create(@Body() createPhaseInputDto: CreatePhaseInputDto) {
    return this.phaseInputsService.create(createPhaseInputDto);
  }

  @Get()
  findAll() {
    return this.phaseInputsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phaseInputsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhaseInputDto: UpdatePhaseInputDto) {
    return this.phaseInputsService.update(+id, updatePhaseInputDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phaseInputsService.remove(+id);
  }
}
