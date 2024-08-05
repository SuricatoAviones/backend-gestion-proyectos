
import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";
import { Tracking } from "src/trackings/entities/tracking.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";


@Entity({ name: 'i013t_tarea' })
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i013i_tarea: number;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  in_nombre: string

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.i001i_usuario)
  @JoinColumn()
  i013f_i001t_usuario: User;

  @ApiProperty()
  @ManyToOne(() => Project, (project) => project.i003i_entrada)
  @JoinColumn()
  i013f_i003t_entrada: Project;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  tx_descripcion: string;


  @ApiProperty()
  @OneToOne(() => Tracking, (tracking) => tracking.i014f_i013t_tarea, {
    cascade: true , eager: true,
  })
  @JoinColumn()
  i013f_i014t_seguimiento: Tracking | null;
}
