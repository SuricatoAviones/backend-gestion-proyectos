import { ApiProperty } from '@nestjs/swagger';
import { Management } from 'src/managements/entities/management.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'c008t_equipo_trabajo' })
export class Team {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  c008i_equipo_trabajo: number;
  @ApiProperty()
  @ManyToOne(() => Management, (management) => management.i009i_gerencia)
  @JoinColumn({ name: 'c008f_i009t_gerencia_funcional' })
  c008f_i009t_gerencia_funcional: Management;
  @ApiProperty()
  @ManyToOne(() => Management, (management) => management.i009i_gerencia)
  @JoinColumn({ name: 'c008f_i009t_gerencia_tecnica' })
  c008f_i009t_gerencia_tecnica: Management;
  @ApiProperty()
  @ManyToOne(() => Management, (management) => management.i009i_gerencia)
  @JoinColumn({ name: 'c008f_i009t_gerencia_galba' })
  c008f_i009t_gerencia_galba: Management;
  @ApiProperty()
  @ManyToOne(() => Worker, (worker) => worker.i017i_trabajador)
  @JoinColumn({ name: 'c008f_i001t_lider_funcional' })
  c008f_i001t_lider_funcional: Worker;
  @ApiProperty()
  @ManyToOne(() => Worker, (worker) => worker.i017i_trabajador)
  @JoinColumn({ name: 'c008f_i001t_lider_negocio' })
  c008f_i001t_lider_negocio: Worker;
  @ApiProperty()
  @ManyToOne(() => Worker, (worker) => worker.i017i_trabajador)
  @JoinColumn({ name: 'c008f_i001t_lider_tecnico' })
  c008f_i001t_lider_tecnico: Worker;
  @ApiProperty()
  @ManyToOne(() => Worker, (worker) => worker.i017i_trabajador)
  @JoinColumn({ name: 'c008f_i001t_trabajador' })
  c008f_i001t_trabajador: Worker;
  @ApiProperty()
  @Column({ length: 255 })
  in_cargo: string;
}
