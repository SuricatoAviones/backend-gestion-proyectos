import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity({ name: 'i007t_historia_usuario' })
export class UserHistory {
  @PrimaryGeneratedColumn()
  i007i_historia_usuario: number;

  @Column({ unique: true })
  co_historia: string;

  @Column({ length: 255 })
  in_titulo: string;

  @Column({ length: 255 })
  tx_descripcion: string;

  @Column({ length: 255 })
  tx_rol: string;

  @Column({ length: 255 })
  tx_funcionalidad: string;

  @Column({ length: 255 })
  tx_criterio: string;

  @ManyToOne(() => Project, (project) => project.i003i_entrada)
  i003i_entrada: Project;

}
