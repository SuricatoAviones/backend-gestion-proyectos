// database.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execPromise = promisify(exec);

@Injectable()
export class DatabaseService {
  async downloadDatabase(): Promise<string> {
    const filePath = path.join(__dirname, '../../exports/database.sql');

    // Comando para hacer un dump de la base de datos
    const command = `pg_dump -U postgres -h localhost -d gestionador -f ${filePath}`;

    try {
      await execPromise(command);
      return filePath;
    } catch (error) {
        throw new BadRequestException(error)
    }
  }
}
