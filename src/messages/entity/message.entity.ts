import { Forum } from "src/forums/entity/forum.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from "typeorm";


@Entity({ name: 'i019t_mensaje' })
export class Message {
  @PrimaryGeneratedColumn()
  i019i_mensaje: number;

  @ManyToOne(() => User, (user) => user.i001i_usuario)
  @JoinColumn()
  i018f_i001t_usuario: User;

  @ManyToOne(() => Forum, (forum) => forum.i018t_foro)
  @JoinColumn()
  i018f_i019t_foro: Forum;

  @Column({ length: 255 })
  tx_mensaje: string;

  @CreateDateColumn()
  createdAt: Date;
}
