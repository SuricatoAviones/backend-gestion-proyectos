import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity({name:'i007t_historia_usuario'})
export class UserHistory {
    @PrimaryGeneratedColumn()
    i007i_historia_usuario: number;

  /* @ManyToOne(() => Entry, (entry) => entry.userStory)
  i007f_i003t_entrada: Entry; */

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
}
