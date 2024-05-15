import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'i001t_usuario'})

export class User {
  @PrimaryGeneratedColumn()
  i001i_usuario: number;

  @Column({ unique: true })
  in_usuario: string;

  @Column({ nullable: true })
  in_nombre: string;

  @Column({ nullable: true })
  in_apellido: string;

  @Column({ nullable: true })
  foto: string;

  @Column({ unique: true })
  in_correo: string;

  @Column({ nullable: true })
  i001f_i002t_rol: string;
}
