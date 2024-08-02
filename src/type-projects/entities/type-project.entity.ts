import { ApiProperty } from "@nestjs/swagger";
import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity({ name: 'i011t_tipo_proyecto' })
export class TypeProject {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i011i_tipo_proyecto: number;
   @ApiProperty()
  @ManyToOne(() => ProjectsPhase, (projectsPhase) => projectsPhase.i012i_fase_proyecto, {cascade: true,  nullable: true })
  i011f_i012t_fase_proyecto: ProjectsPhase;
   @ApiProperty()
  @Column({ length: 255,  nullable:true })
  in_nombre: string;
   @ApiProperty()
  @Column({ length: 255,  nullable:true })
  tx_descripcion: string;
}
