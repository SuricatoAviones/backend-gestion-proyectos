import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity({name:'i014t_seguimiento'})
export class Tracking {
    @PrimaryGeneratedColumn()
    i014i_seguimiento: number;

 /*  @ManyToOne(() => Task, (task) => task.seguimientos)
  i014f_i013t_tarea: Task; */

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

  /* @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.seguimientos)
  i014f_i015t_estado_tarea: TaskStatus; */
}
