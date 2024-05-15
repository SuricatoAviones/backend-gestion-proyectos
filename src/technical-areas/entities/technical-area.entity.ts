import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'i010t_area_tecnica'})
export class TechnicalArea {
    @PrimaryGeneratedColumn()
    i010i_area_tecnica: number;

  @Column({ length: 255 })
  in_nombre: string;

  @Column({ length: 255 })
  tx_descripcion: string;
}
