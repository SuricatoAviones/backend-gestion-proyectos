import { StatusTask } from "src/status-task/entities/status-task.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'i014t_seguimiento' })
export class Tracking {
  @PrimaryGeneratedColumn()
  i014i_seguimiento: number;

  @ManyToOne(() => Task, (task) => task.i013i_tarea)
  @JoinColumn()
  i014f_i013t_tarea: Task;

  @Column({ type: "integer" })
  nu_completado: number;

  @Column({ type: "date" })
  fe_plan_inicio: Date;

  @Column({ type: "date" })
  fe_plan_fin: Date;

  @Column({ type: "date" })
  fe_real_inicio: Date;

  @Column({ type: "date" })
  fe_real_fin: Date;

  @ManyToOne(() => StatusTask, (statusTask) => statusTask.i015i_estado_tarea)
  i014f_i015t_estado_tarea: StatusTask;
}
