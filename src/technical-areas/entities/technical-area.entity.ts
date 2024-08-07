import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'i010t_area_tecnica' })
export class TechnicalArea {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i010i_area_tecnica: number;
  @ApiProperty()
  @Column({ length: 255, nullable:true })
  in_nombre: string;
  @ApiProperty()
  @Column({ length: 255, nullable:true })
  tx_descripcion: string;
}
