import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity({name:'i017t_trabajador'})
export class Worker {
  @PrimaryGeneratedColumn()
  i017i_trabajador: number;

 /*  @ManyToOne(() => Team, (team) => team.workers)
  i017f_c008t_equipo_trabajo: Team; */

  @Column({ length: 255 })
  in_nombre: string;

  @Column({ length: 255 })
  tx_cargo: string;
}
