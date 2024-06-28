import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdditionalDataService } from './additional-data.service';
import { CreateAdditionalDatumDto } from './dto/create-additional-datum.dto';
import { UpdateAdditionalDatumDto } from './dto/update-additional-datum.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Datos Adicionales')
@ApiBearerAuth()
@Controller('additional-data')
export class AdditionalDataController {
  constructor(private readonly additionalDataService: AdditionalDataService) {}

  @Post()
  create(@Body() createAdditionalDatumDto: CreateAdditionalDatumDto) {
    return this.additionalDataService.create(createAdditionalDatumDto);
  }

  @Get()
  findAll() {
    return this.additionalDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.additionalDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdditionalDatumDto: UpdateAdditionalDatumDto) {
    return this.additionalDataService.update(+id, updateAdditionalDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.additionalDataService.remove(+id);
  }
}
