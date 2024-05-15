import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
/* import { ProjectType } from "./ProjectType"; */

@Entity({name:'i011t_tipo_proyecto'})
export class TypeProject {
    @PrimaryGeneratedColumn()
    i011i_tipo_proyecto: number;

 /*  @ManyToOne(() => ProjectType, (projectType) => projectType.phases)
  i011f_i012t_fase_proyecto: ProjectType;
 */
  @Column({ length: 255 })
  in_nombre: string;

  @Column({ length: 255 })
  tx_descripcion: string;
}
