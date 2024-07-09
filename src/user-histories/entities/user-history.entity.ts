import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity({ name: 'i007t_historia_usuario' })
export class UserHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i007i_historia_usuario: number;
  @ApiProperty()
  @Column({ unique: true })
  co_historia: string;
  @ApiProperty()
  @Column({ length: 255 })
  in_titulo: string;
  @ApiProperty()
  @Column({ length: 255 })
  tx_descripcion: string;
  @ApiProperty()
  @Column({ length: 255 })
  tx_rol: string;
  @ApiProperty()
  @Column({ length: 255 })
  tx_funcionalidad: string;
  @ApiProperty()
  @Column({ length: 255 })
  tx_criterio: string;
  @ApiProperty()
  @ManyToOne(() => Project, (project) => project.i003i_entrada)
  i003i_entrada: Project;

}
