import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { StatusTask } from "src/status-task/entities/status-task.entity";
import { Task } from "src/tasks/entities/task.entity";

export class CreateTrackingDto {
  @ApiProperty()
  @IsNumber()
  nu_completado_real: number[];
  @ApiProperty()
  @IsNumber()
  nu_completado_planificado: number[];
  @ApiProperty()
  @IsDate()
  fe_plan_inicio: Date;
  @ApiProperty()
  @IsDate()
  fe_plan_fin: Date;
  @ApiProperty()
  @IsDate()
  fe_real_inicio: Date;
  @ApiProperty()
  @IsDate()
  fe_real_fin: Date;
  @ApiProperty()
  @IsNotEmpty()
  @Type( () => Task)
  i014f_i013t_tarea: Task;
  @ApiProperty()
  @IsNotEmpty()
  @Type( () => StatusTask)
  i014f_i015t_estado_tarea: StatusTask;
}
