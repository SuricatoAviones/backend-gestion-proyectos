import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'i006t_estado_entrada'})
export class InputStatus {
    @PrimaryGeneratedColumn()
    i006i_estado_entrada: number;

  @Column({ length: 255 })
  in_nombre_estado: string;

  @Column({ length: 255 })
  tx_descripcion_estado: string;
}
