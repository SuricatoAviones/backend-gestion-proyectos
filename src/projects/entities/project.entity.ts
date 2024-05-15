import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity({name:'i003t_entrada'})
export class Project {
    @PrimaryGeneratedColumn()
    i003i_entrada: number;

  @Column({ unique: true })
  co_entrada: string;

/*   @ManyToOne(() => AreaTecnica, (areaTecnica) => areaTecnica.entries)
  i003f_i010t_area_tecnica: AreaTecnica;

  @ManyToOne(() => ProjectType, (projectType) => projectType.entries)
  i003f_i011_tipo_proyecto: ProjectType; */

  @Column({ length: 255 })
  in_titulo: string;

  @Column({ length: 255 })
  tx_descripcion: string;

  @Column({ length: 255 })
  tx_objetivo: string;

  @Column({ length: 255 })
  tx_alcance: string;

/*   @ManyToOne(() => Team, (team) => team.entries)
  i0003f_i008t_equipo_trabajo: Team;

  @ManyToOne(() => PhaseEntry, (phaseEntry) => phaseEntry.entries)
  i003f_i005t_fase_entrada: PhaseEntry;

  @ManyToOne(() => EntryStatus, (entryStatus) => entryStatus.entries)
  i003f_i006t_estado_entrada: EntryStatus;

  @ManyToOne(() => UserStory, (userStory) => userStory.entries)
  i003f_i007t_historia_usuario: UserStory; */
}
