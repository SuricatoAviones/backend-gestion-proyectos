import { ApiProperty } from "@nestjs/swagger";
import { StatusTask } from "src/status-task/entities/status-task.entity";
import { Task } from "src/tasks/entities/task.entity";

export class CreateTrackingDto {
  @ApiProperty()
  nu_completado: number;
  @ApiProperty()
  fe_plan_inicio: Date;
  @ApiProperty()
  fe_plan_fin: Date;
  @ApiProperty()
  fe_real_inicio: Date;
  @ApiProperty()
  fe_real_fin: Date;
  @ApiProperty()
  i014f_i013t_tarea: Task;
  @ApiProperty()
  i014f_i015t_estado_tarea: StatusTask;
}
