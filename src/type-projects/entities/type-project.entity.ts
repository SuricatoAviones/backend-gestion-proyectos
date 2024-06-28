import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity({ name: 'i011t_tipo_proyecto' })
export class TypeProject {
  @PrimaryGeneratedColumn()
  i011i_tipo_proyecto: number;

  @ManyToOne(() => ProjectsPhase, (projectsPhase) => projectsPhase.i012i_fase_proyecto)
  i011f_i012t_fase_proyecto: ProjectsPhase;

  @Column({ length: 255 })
  in_nombre: string;

  @Column({ length: 255 })
  tx_descripcion: string;
}
