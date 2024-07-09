import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'i009t_gerencia'})
export class Management {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i009i_gerencia: number;
  
  @ApiProperty()
  @Column({ length: 255 })
  in_nombre: string;

  @ApiProperty()
  @Column({ length: 255 })
  tx_descripcion : string;
}
