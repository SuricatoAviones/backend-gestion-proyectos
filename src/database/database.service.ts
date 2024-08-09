import { BadRequestException, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { Parser } from 'json2csv';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class DatabaseService {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      database: 'gestionador',
      password: process.env.DATABASE_PASSWORD,
      port: 5432,
      autoLoadEntities: true,
      synchronize: true,
      ssl:{
       rejectUnauthorized: false
     }
    });
    this.client.connect();
  }

  async exportToCSV(): Promise<string> {
    try {
      // Obtener la lista de tablas en la base de datos
      const tableQuery = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public' AND table_type='BASE TABLE';
      `;
      const tablesResult = await this.client.query(tableQuery);
      const tables = tablesResult.rows.map(row => row.table_name);
      let allData = [];

      // Iterar sobre cada tabla y extraer los datos
      for (const table of tables) {
        const query = `SELECT * FROM ${table}`;
        const result = await this.client.query(query);
        if (result.rows.length > 0) {
          allData.push({ table, data: result.rows });
        }
      }

      // Convertir todos los datos a CSV
      let csvData = '';
      const json2csvParser = new Parser();
      allData.forEach(({ table, data }) => {
        csvData += `\nTable: ${table}\n`;
        csvData += json2csvParser.parse(data);
        csvData += '\n';
      });

      const filePath = join(__dirname, 'db_export.csv');
      fs.writeFileSync(filePath, csvData);
      return filePath; // Retorna la ruta del archivo CSV
    } catch (err) {
      console.error('Error al exportar datos:', err);
      throw new BadRequestException(err)
    }
  }
}
