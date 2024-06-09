import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity({ name: 'i012t_fase_proyecto' })
export class ProjectsPhase {
  @PrimaryGeneratedColumn()
  i012i_fase_proyecto: number;

  @Column({ length: 255 })
  in_nombre: string;

  @Column({ length: 255 })
  tx_descripcion: string;
}
