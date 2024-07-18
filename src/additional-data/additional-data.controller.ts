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
  constructor(private readonly additionalDataService: AdditionalDataService) {}


  @Post()
   @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'string',
      format: 'binary',
      // type: 'object',
      // properties: {
      //   tx_interfaz: { type: 'string' },
      //   tx_interconexion: { type: 'string' },
      //   tx_comentario: { type: 'string' },
      //   tx_seguridad: { type: 'string' },
      //   tx_datamodelo: {
      //     type: 'string',
      //     format: 'binary',
      //   },
      // },
    },
  })
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: () => {const path =  `${process.cwd() + '/uploads'}` ;
  //       console.log(path)
  //       return path},
  //       filename: function (req, file, cb) {
  //         cb(null, file.originalname + '_' + Date.now());
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(@FileInterceptor('file'))
  create(@UploadedFile() file: any) {
    console.log(file)
    // return this.additionalDataService.create(createAdditionalDatumDto);
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
