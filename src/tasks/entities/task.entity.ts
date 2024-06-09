
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";


@Entity({ name: 'i013t_tarea' })
export class Task {
  @PrimaryGeneratedColumn()
  i013i_tarea: number;

  @ManyToOne(() => User, (user) => user.i001i_usuario)
  @JoinColumn()
  i013f_i001t_usuario: User;

  @ManyToOne(() => Project, (project) => project.i003i_entrada)
  @JoinColumn()
  i013f_i003t_entrada: Project;

  @Column({ length: 255 })
  tx_descripcion: string;

  @Column({ length: 255 })
  description: string;
}
