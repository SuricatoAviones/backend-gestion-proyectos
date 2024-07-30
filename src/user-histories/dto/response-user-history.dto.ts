import { Project } from "src/projects/entities/project.entity";
import { UserHistory } from "../entities/user-history.entity";
import { ResponseProjectDto } from "src/projects/dto/response-project.dto";

export class ResponseUserHistoryDto {
    i007i_historia_usuario: number;
    co_historia: string;
    in_titulo: string;
    tx_descripcion: string;
    tx_rol: string;
    tx_funcionalidad: string;
    tx_criterio: string;
    i013f_i003t_entrada: Project;


    constructor(data: UserHistory) {
        this.i007i_historia_usuario = data.i007i_historia_usuario;
        this.co_historia = data.co_historia;
        this.in_titulo = data.in_titulo;
        this.tx_descripcion = data.tx_descripcion;
        this.tx_rol = data.tx_rol;
        this.tx_funcionalidad = data.tx_funcionalidad;
        this.tx_criterio = data.tx_criterio;
        this.i013f_i003t_entrada = new ResponseProjectDto(data.i013f_i003t_entrada);

    }
}
