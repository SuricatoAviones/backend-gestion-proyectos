import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm";
import { Roles } from "../enums/roles.enum";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:'i001t_usuario'})

export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i001i_usuario: number;
 @ApiProperty()
  @Column({ unique: true })
  in_usuario: string;
 @ApiProperty()
  @Column({ nullable: true })
  in_nombre: string;
 @ApiProperty()
  @Column({ nullable: true })
  in_apellido: string;
 @ApiProperty()
  @Column({ nullable: true,type: "bytea" })
  foto: string;
 @ApiProperty()
  @Column({ unique: true, nullable: false })
  in_correo: string;
 @ApiProperty()
  @Exclude()
  @Column({  nullable: false })
  password: string;
 @ApiProperty()
  @Column({ nullable: true, default: Roles.Rol_Trabajador  })
  in_role: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
