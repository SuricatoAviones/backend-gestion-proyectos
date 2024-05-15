import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InputStatusService } from './input-status.service';
import { CreateInputStatusDto } from './dto/create-input-status.dto';
import { UpdateInputStatusDto } from './dto/update-input-status.dto';

@Controller('input-status')
export class InputStatusController {
  constructor(private readonly inputStatusService: InputStatusService) {}

  @Post()
  create(@Body() createInputStatusDto: CreateInputStatusDto) {
    return this.inputStatusService.create(createInputStatusDto);
  }

  @Get()
  findAll() {
    return this.inputStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inputStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInputStatusDto: UpdateInputStatusDto) {
    return this.inputStatusService.update(+id, updateInputStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inputStatusService.remove(+id);
  }
}
