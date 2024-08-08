// database.controller.ts
import { BadRequestException, Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { DatabaseService } from './database.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Database')
@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('download')
  async download(@Res() res: Response) {
    const filePath = await this.databaseService.downloadDatabase();
    res.download(filePath, 'database.sql', (error) => {
      if (error) {
        throw new BadRequestException(error)
      }
    });
  }
}
