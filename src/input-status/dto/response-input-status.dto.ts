import { InputStatus } from "../entities/input-status.entity";

export class ResponseInputStatusDto {
    i006i_estado_entrada: number;
    in_nombre_estado: string;
    tx_descripcion_estado: string;

    constructor(data: InputStatus) {
        this.i006i_estado_entrada = data.i006i_estado_entrada;
        this.in_nombre_estado = data.in_nombre_estado;
        this.tx_descripcion_estado = data.tx_descripcion_estado;
    }
}