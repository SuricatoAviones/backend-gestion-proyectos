import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'i007t_historia_usuario' })
export class UserHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i007i_historia_usuario: number;
  @ApiProperty()
  @Column({ unique: true })
  co_historia: string;
  @ApiProperty()
  @Column({ length: 255, nullable:true })
  in_titulo: string;
  @ApiProperty()
  @Column({ length: 255, nullable:true })
  tx_descripcion: string;
  @ApiProperty()
  @Column({ length: 255, nullable:true })
  tx_rol: string;
  @ApiProperty()
  @Column({ length: 255, nullable:true })
  tx_funcionalidad: string;
  @ApiProperty()
  @Column({ length: 255, nullable:true })
  tx_criterio: string;
  @ApiProperty()
  @JoinColumn()
  @ManyToOne(() => Project, (project) => project.i003i_entrada, {  nullable:true, onDelete: 'CASCADE'})
  i013f_i003t_entrada: Project;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
