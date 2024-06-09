import { StatusTask } from "../entities/status-task.entity";

export class ResponseStatusTaskDto {
    
    i015i_estado_tarea: number;
    in_titulo: string;
    tx_descripcion: string;

    constructor(data: StatusTask) {
        this.i015i_estado_tarea = data.i015i_estado_tarea;
        this.in_titulo = data.in_titulo;
        this.tx_descripcion = data.tx_descripcion;
    }

}