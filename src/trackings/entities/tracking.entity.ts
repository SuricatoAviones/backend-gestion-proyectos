import { ApiProperty } from "@nestjs/swagger";
import { StatusTask } from "src/status-task/entities/status-task.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";

@Entity({ name: 'i014t_seguimiento' })
export class Tracking {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i014i_seguimiento: number;

  @ApiProperty()
  @OneToOne(() => Task, (task) => task.i013f_i014t_seguimiento, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn()
  i014f_i013t_tarea: Task;

  @ApiProperty()
  @Column({ type: "integer" })
  nu_completado: number;
  @ApiProperty()
  @Column({ type: "date" })
  fe_plan_inicio: Date;
  @ApiProperty()
  @Column({ type: "date" })
  fe_plan_fin: Date;
  @ApiProperty()
  @Column({ type: "date" })
  fe_real_inicio: Date;
  @ApiProperty()
  @Column({ type: "date" })
  fe_real_fin: Date;
  @ApiProperty()
  @ManyToOne(() => StatusTask, (statusTask) => statusTask.i015i_estado_tarea)
  @JoinColumn()
  i014f_i015t_estado_tarea: StatusTask;
}
