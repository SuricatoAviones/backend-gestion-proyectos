// database.controller.ts
import { BadRequestException, Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { DatabaseService } from './database.service';
import { ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';

@ApiTags('Database')
@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('csv')
  async exportCSV(@Res() res: Response) {
    try {
      const filePath = await this.databaseService.exportToCSV();
      res.download(filePath, 'db_export.csv', (err) => {
        if (err) {
          console.error('Error al descargar el archivo:', err);
        }
        fs.unlinkSync(filePath); // Eliminar el archivo después de descargarlo
      });
    } catch (error) {
      console.error('Error al exportar datos:', error);
      throw new BadRequestException(error)
    }
  }
}
