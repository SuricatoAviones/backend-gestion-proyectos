import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity({name:'i012t_fase_proyecto'})
export class ProjectsPhase {
    @PrimaryGeneratedColumn()
    i012i_fase_proyecto: number;

  /* @ManyToOne(() => ProjectType, (projectType) => projectType.phases)
  i002f_i011t_tipo_proyecto: ProjectType; */

  @Column({ length: 255 })
  in_nombre: string;

  @Column({ length: 255 })
  tx_descripcion: string;
}
