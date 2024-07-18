import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { AdditionalDataService } from './additional-data.service';
import { CreateAdditionalDatumDto } from './dto/create-additional-datum.dto';
import { UpdateAdditionalDatumDto } from './dto/update-additional-datum.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@ApiTags('Datos Adicionales')
@ApiBearerAuth()
@Controller('additional-data')
export class AdditionalDataController {
  constructor(private readonly additionalDataService: AdditionalDataService) { }



  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(
    FileInterceptor('tx_datamodelo', {
      storage: diskStorage({
        destination: './uploads/',
        filename: function (req, file, cb) {
          cb(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
  )

  create(@Body() createAdditionalDatumDto: CreateAdditionalDatumDto, @UploadedFile() tx_datamodelo?: any) {
    createAdditionalDatumDto.tx_datamodelo = tx_datamodelo.path
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
