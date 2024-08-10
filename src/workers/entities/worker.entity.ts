import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/teams/entities/team.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";


@Entity({name:'i017t_trabajador'})
export class Worker {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i017i_trabajador: number;

  @ApiProperty()
  @ManyToMany(() => Team, (team) => team.c008i_equipo_trabajo)
  @JoinTable()
  i017f_c008t_equipo_trabajo: Team; 

   @ApiProperty()
  @Column({ length: 255 })
  in_nombre: string;

   @ApiProperty()
  @Column({ length: 255 })
  tx_cargo: string;
}
