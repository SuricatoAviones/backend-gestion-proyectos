import { ApiProperty } from "@nestjs/swagger";
import { StatusTask } from "src/status-task/entities/status-task.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";

@Entity({ name: 'i014t_seguimiento' })
export class Tracking {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i014i_seguimiento: number;

  @ApiProperty()
  @OneToOne(() => Task, (task) => task.i013f_i014t_seguimiento)
  i014f_i013t_tarea: Task;
  @ApiProperty()
  @Column({ type: "integer", array:true })
  nu_completado_real: number[];

  @ApiProperty()
  @Column({ type: "integer", array:true })
  nu_completado_planificado: number[];

  @ApiProperty()
  @Column({ type: "date" })
  fe_plan_inicio: Date;
  @ApiProperty()
  @Column({ type: "date" })
  fe_plan_fin: Date;
  @ApiProperty()
  @Column({ type: "date", nullable: true })
  fe_real_inicio: Date;
  @ApiProperty()
  @Column({ type: "date", nullable: true })
  fe_real_fin: Date;
  @ApiProperty()
  @ManyToOne(() => StatusTask, (statusTask) => statusTask.i015i_estado_tarea, {cascade: true, nullable: true, onDelete: 'CASCADE'})
  @JoinColumn()
  i014f_i015t_estado_tarea: StatusTask = { in_titulo:'Por Iniciar',i015i_estado_tarea:1,tx_descripcion: ''};

  @UpdateDateColumn()
  updatedAt: Date;
}

