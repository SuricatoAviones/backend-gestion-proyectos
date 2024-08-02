import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'i009t_gerencia'})
export class Management {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i009i_gerencia: number;
  
  @ApiProperty()
  @Column({ length: 255,  nullable:true })
  in_nombre: string;

  @ApiProperty()
  @Column({ length: 255 , nullable:true})
  tx_descripcion : string;
}
