import { AdditionalDatum } from "src/additional-data/entities/additional-datum.entity";
import { InputStatus } from "src/input-status/entities/input-status.entity";
import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
import { Team } from "src/teams/entities/team.entity";
import { TechnicalArea } from "src/technical-areas/entities/technical-area.entity";
import { TypeProject } from "src/type-projects/entities/type-project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";


@Entity({ name: 'i003t_entrada' })
export class Project {
  @PrimaryGeneratedColumn()
  i003i_entrada: number;

  @Column({ unique: true })
  co_entrada: string;

  @ManyToOne(() => TechnicalArea, (technicalArea) => technicalArea.i010i_area_tecnica)
  i003f_i010t_area_tecnica: TechnicalArea;

  @ManyToOne(() => TypeProject, (typeProject) => typeProject.i011i_tipo_proyecto)
  @JoinColumn()
  i003f_i011_tipo_proyecto: TypeProject;

  @Column({ length: 255 })
  in_titulo: string;

  @Column({ length: 255 })
  tx_descripcion: string;

  @Column({ length: 255 })
  tx_objetivo: string;

  @Column({ length: 255 })
  tx_alcance: string;

  @OneToOne(() => Team, (team) => team.c008i_equipo_trabajo, { cascade: true })
  i0003f_i008t_equipo_trabajo: Team;

  @ManyToOne(() => ProjectsPhase, (projectsPhase) => projectsPhase.i012i_fase_proyecto)
  @JoinColumn()
  i003f_i005t_fase_entrada: ProjectsPhase;

  @ManyToOne(() => InputStatus, (inputStatus) => inputStatus.i006i_estado_entrada)
  @JoinColumn()
  i003f_i006t_estado_entrada: InputStatus;

  @OneToOne(() => AdditionalDatum, (additionalDatum) => additionalDatum.i004i_datos_adi, { cascade: true })
  @JoinColumn()
  i004i_datos_adi: AdditionalDatum;

}
