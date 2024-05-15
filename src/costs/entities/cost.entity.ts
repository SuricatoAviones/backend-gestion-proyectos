import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity({name:'i016t_costo'})
export class Cost {
  @PrimaryGeneratedColumn()
  i016i_costo: number;

  @ManyToOne(() => Project, (project) => project.i003i_entrada)
  i016f_i003t_entrada : Project[];

  @Column({ length: 255 })
  in_titulo : string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  nu_monto: number;
}
