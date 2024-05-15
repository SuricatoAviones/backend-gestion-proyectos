
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity({name:'i013t_tarea'})
export class Task {
  @PrimaryGeneratedColumn()
  i013i_tarea: number;

/*   @ManyToOne(() => User, (user) => user.tasks)
  i013f_i001t_usuario: User;

  @ManyToOne(() => Entry, (entry) => entry.tasks)
  i013f_i003t_entrada: Entry; */

  @Column({ length: 255 })
  tx_descripcion: string;

  @Column({ length: 255 })
  description: string;
}
