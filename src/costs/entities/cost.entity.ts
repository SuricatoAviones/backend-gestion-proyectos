import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'i016t_costo' })
export class Cost {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i016i_costo: number;
  
  @ApiProperty()
  @ManyToOne(() => Project, (project) => project.i003i_entrada , { nullable:true, onDelete: 'CASCADE'})
  @JoinColumn()
  i016f_i003t_entrada: Project;

  @ApiProperty()
  @Column({ length: 255, nullable:true })
  in_titulo: string;
  
  @ApiProperty()
  @Column({ type: "decimal", precision: 10, scale: 2, nullable:true })
  nu_monto: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
