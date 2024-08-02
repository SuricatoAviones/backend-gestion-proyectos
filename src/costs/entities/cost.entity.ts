import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";


@Entity({ name: 'i016t_costo' })
export class Cost {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i016i_costo: number;
  
  @ApiProperty()
  @ManyToOne(() => Project, (project) => project.i003i_entrada , { nullable:true})
  @JoinColumn()
  i016f_i003t_entrada: Project;

  @ApiProperty()
  @Column({ length: 255, nullable:true })
  in_titulo: string;
  
  @ApiProperty()
  @Column({ type: "decimal", precision: 10, scale: 2, nullable:true })
  nu_monto: number;
}
