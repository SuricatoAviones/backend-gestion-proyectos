import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Task } from "../entities/task.entity";
import { ResponseProjectDto } from "src/projects/dto/response-project.dto";
import { Tracking } from "src/trackings/entities/tracking.entity";
import { ResponseTrackingDto } from "src/trackings/dto/response-trackings.dto";

export class ResponseTaskDto {
    i013i_tarea: number;
    in_nombre: string;
    tx_descripcion: string;
    i013f_i001t_usuario: User;
    i013f_i003t_entrada: Project;
    i013f_i014t_seguimiento: Tracking

    

    constructor(data: Task) {
        this.i013i_tarea = data.i013i_tarea;
        this.tx_descripcion = data.tx_descripcion
        this.in_nombre = data.in_nombre
        this.i013f_i001t_usuario = data.i013f_i001t_usuario // TODO: Response de user
        this.i013f_i003t_entrada = new ResponseProjectDto(data.i013f_i003t_entrada)
        this.i013f_i014t_seguimiento = data.i013f_i014t_seguimiento
    }
  }
  

