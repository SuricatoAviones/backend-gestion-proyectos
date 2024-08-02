import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'i006t_estado_entrada' })
export class InputStatus {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i006i_estado_entrada: number;

  @ApiProperty()
  @Column({ length: 255 ,  nullable:true})
  in_nombre_estado: string;
  
  @ApiProperty()
  @Column({ length: 255 ,  nullable:true})
  tx_descripcion_estado: string;
}
