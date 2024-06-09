import { TechnicalArea } from "../entities/technical-area.entity";

export class ResponseTechnicalAreaDto {
    i010i_area_tecnica: number;
    in_nombre: string;
    tx_descripcion: string;
  
    constructor(data: TechnicalArea) {
        this.i010i_area_tecnica = data.i010i_area_tecnica;
        this.in_nombre = data.in_nombre;
        this.tx_descripcion = data.tx_descripcion
    }
  }
  