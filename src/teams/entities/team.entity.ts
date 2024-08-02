import { ApiProperty } from '@nestjs/swagger';
import { Management } from 'src/managements/entities/management.entity';
import { User } from 'src/users/entities/user.entity';
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
  @ManyToOne(() => Management, (management) => management.i009i_gerencia, {cascade: true , nullable: true})
  @JoinColumn({ name: 'c008f_i009t_gerencia_funcional' })
  c008f_i009t_gerencia_funcional: Management;
  @ApiProperty()
  @ManyToOne(() => Management, (management) => management.i009i_gerencia, {cascade: true , nullable: true})
  @JoinColumn({ name: 'c008f_i009t_gerencia_tecnica' })
  c008f_i009t_gerencia_tecnica: Management;
  @ApiProperty()
  @ManyToOne(() => Management, (management) => management.i009i_gerencia, {cascade: true , nullable: true})
  @JoinColumn({ name: 'c008f_i009t_gerencia_galba' })
  c008f_i009t_gerencia_galba: Management;
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.i001i_usuario, {cascade: true , nullable: true})
  @JoinColumn({ name: 'c008f_i001t_lider_funcional' })
  c008f_i001t_lider_funcional: User;
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.i001i_usuario, {cascade: true , nullable: true})
  @JoinColumn({ name: 'c008f_i001t_lider_negocio' })
  c008f_i001t_lider_negocio: User;
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.i001i_usuario, {cascade: true , nullable: true})
  @JoinColumn({ name: 'c008f_i001t_lider_tecnico' })
  c008f_i001t_lider_tecnico: User;
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.i001i_usuario, {cascade: true , nullable: true})
  @JoinColumn({ name: 'c008f_i001t_trabajador' })
  c008f_i001t_trabajador: User;
  @ApiProperty()
  @Column({ length: 255, nullable: true })
  in_cargo: string;
}
