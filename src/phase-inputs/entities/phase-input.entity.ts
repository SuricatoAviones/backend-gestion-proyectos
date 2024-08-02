import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'i0005t_fase_entrada'})
export class PhaseInput {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i0005i_fase_entrada: number;

  @ApiProperty()
  @Column({ length: 255, nullable:true })
  in_nombre_fase : string;

  @ApiProperty()
  @Column({ length: 255, nullable:true })
  tx_descripcion_fase : string;
}
