import { Body, Controller, Delete, Get, Param, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        in_usuario: { type: 'string' },
        in_nombre: { type: 'string' },
        in_apellido: { type: 'string' },
        in_correo: { type: 'string' },
        in_role: { type: 'string' },
        password: { type: 'string' },
        foto: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads/',
        filename: function (req, file, cb) {
          cb(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
  )
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() foto?: any) {
    /* UpdateUserDto.foto = foto.path  */
    return this.usersService.update(+id, updateUserDto);
  }
}
