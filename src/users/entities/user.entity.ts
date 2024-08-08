import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn ,DeleteDateColumn, UpdateDateColumn, JoinColumn, ManyToMany } from "typeorm";
import { Roles } from "../enums/roles.enum";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/teams/entities/team.entity";

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
  @Column({ nullable: true})
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

  /* @ApiProperty()
  @ManyToMany(() => Team, (team) => team.c008i_equipo_trabajo, { cascade: true, nullable: true })
  @JoinColumn()
  i0003f_i008t_equipo_trabajo: Team; */



  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt:Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
