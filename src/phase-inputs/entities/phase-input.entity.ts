import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'i0005t_fase_entrada'})
export class PhaseInput {
  @PrimaryGeneratedColumn()
  i0005i_fase_entrada: number;

  @Column({ length: 255 })
  in_nombre_fase : string;

  @Column({ length: 255 })
  tx_descripcion_fase : string;
}
