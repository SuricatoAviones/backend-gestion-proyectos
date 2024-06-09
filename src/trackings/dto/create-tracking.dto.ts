import { StatusTask } from "src/status-task/entities/status-task.entity";
import { Task } from "src/tasks/entities/task.entity";

export class CreateTrackingDto {
  nu_completado: number;
  fe_plan_inicio: Date;
  fe_plan_fin: Date;
  fe_real_inicio: Date;
  fe_real_fin: Date;
  i014f_i013t_tarea: Task;
  i014f_i015t_estado_tarea: StatusTask;
}
