import { StatusTask } from "src/status-task/entities/status-task.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Tracking } from "../entities/tracking.entity";
import { ResponseTaskDto } from "src/tasks/dto/response-task.dto";
import { ResponseStatusTaskDto } from "src/status-task/dto/response-status-task.dto";

export class ResponseTrackingDto {
    i014i_seguimiento: number;
    nu_completado_planificado: number[];
    nu_completado_real: number[];
    fe_plan_inicio: Date;
    fe_plan_fin: Date;
    fe_real_inicio: Date;
    fe_real_fin: Date;
    i014f_i013t_tarea: Task;
    i014f_i015t_estado_tarea: StatusTask;



    constructor(data: Tracking) {
        this.i014i_seguimiento = data.i014i_seguimiento;
        this.nu_completado_real = data.nu_completado_real;
        this.nu_completado_planificado = data.nu_completado_planificado;
        this.fe_plan_inicio = data.fe_plan_inicio;
        this.fe_plan_fin = data.fe_plan_fin;
        this.fe_real_inicio = data.fe_real_inicio;
        this.fe_real_fin = data.fe_real_fin;
        this.i014f_i013t_tarea = new ResponseTaskDto(data.i014f_i013t_tarea)
        this.i014f_i015t_estado_tarea = new ResponseStatusTaskDto(data.i014f_i015t_estado_tarea)
    }

}