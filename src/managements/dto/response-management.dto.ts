import { Management } from "../entities/management.entity";

export class ResponseManagementDto {
    i009i_gerencia: number;
    in_nombre: string;
    tx_descripcion : string;
    constructor(data: Management) {
        this.i009i_gerencia = data.i009i_gerencia;
        this.in_nombre = data.in_nombre;
        this.tx_descripcion = data.tx_descripcion;
    }
}