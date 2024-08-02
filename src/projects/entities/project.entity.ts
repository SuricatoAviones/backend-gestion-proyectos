import { ApiProperty } from "@nestjs/swagger";
import { AdditionalDatum } from "src/additional-data/entities/additional-datum.entity";
import { Cost } from "src/costs/entities/cost.entity";
import { InputStatus } from "src/input-status/entities/input-status.entity";
import { PhaseInput } from "src/phase-inputs/entities/phase-input.entity";
import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Team } from "src/teams/entities/team.entity";
import { TechnicalArea } from "src/technical-areas/entities/technical-area.entity";
import { TypeProject } from "src/type-projects/entities/type-project.entity";
import { UserHistory } from "src/user-histories/entities/user-history.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";


@Entity({ name: 'i003t_entrada' })
export class Project {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i003i_entrada: number;

  @ApiProperty()
  @Column({ unique: true })
  co_entrada: string;

  @ApiProperty()
  @ManyToOne(() => TechnicalArea, (technicalArea) => technicalArea.i010i_area_tecnica, {cascade: true, nullable:true})
  i003f_i010t_area_tecnica: TechnicalArea;

  @ApiProperty()
  @ManyToOne(() => TypeProject, (typeProject) => typeProject.i011i_tipo_proyecto, {cascade: true, nullable:true} )
  @JoinColumn()
  i003f_i011_tipo_proyecto: TypeProject;

  @ApiProperty()
  @Column({ length: 255, nullable:true })
  in_titulo: string;

  @ApiProperty()
  @Column({ length: 255, nullable:true})
  tx_descripcion: string;

  @ApiProperty()
  @Column({ length: 255, nullable:true })
  tx_objetivo: string;

  @ApiProperty()
  @Column({ length: 255, nullable:true })
  tx_alcance: string;

  @ApiProperty()
  @OneToOne(() => Team, (team) => team.c008i_equipo_trabajo, { cascade: true, nullable: true })
  @JoinColumn()
  i0003f_i008t_equipo_trabajo: Team;

  @ApiProperty()
  @ManyToOne(() => PhaseInput, (projectsPhase) => projectsPhase.i0005i_fase_entrada,{cascade: true, nullable: true})
  @JoinColumn()
  i003f_i005t_fase_entrada: PhaseInput;

  @ApiProperty()
  @ManyToOne(() => InputStatus, (inputStatus) => inputStatus.i006i_estado_entrada,{cascade: true, nullable: true})
  @JoinColumn()
  i003f_i006t_estado_entrada: InputStatus;

  @ApiProperty()
  @OneToOne(() => AdditionalDatum, (additionalDatum) => additionalDatum.i004i_datos_adi, { cascade: true, nullable: true })
  @JoinColumn()
  i004i_datos_adi: AdditionalDatum;

  @ApiProperty()
  @OneToMany(() => Task, (task) => task.i013f_i003t_entrada, { cascade: true, nullable: true })
  i003f_i013t_tareas: Task[];
  
  @ApiProperty()
  @OneToMany(() => UserHistory, (user_history) => user_history.i013f_i003t_entrada, { cascade: true, nullable: true })
  i003f_i007i_historia_usuario: UserHistory[];

  @ApiProperty()
  @OneToMany(() => Cost, (cost) => cost.i016f_i003t_entrada, { cascade: true, nullable: true })
  i003f_i016i_costo: Cost[];


}
