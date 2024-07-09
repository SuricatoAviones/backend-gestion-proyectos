import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity({ name: 'i012t_fase_proyecto' })
export class ProjectsPhase {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i012i_fase_proyecto: number;
  @ApiProperty()
  @Column({ length: 255 })
  in_nombre: string;
  @ApiProperty()
  @Column({ length: 255 })
  tx_descripcion: string;
}
