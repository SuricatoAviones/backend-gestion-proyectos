import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm";
import { Roles } from "../enums/roles.enum";
import { Exclude } from "class-transformer";

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

  @Column({ unique: true, nullable: false })
  in_correo: string;

  @Exclude()
  @Column({  nullable: false })
  password: string;

  @Column({ nullable: true, default: Roles.Rol_Trabajador  })
  in_role: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
