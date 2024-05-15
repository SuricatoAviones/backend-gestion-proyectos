import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'i009t_gerencia'})
export class Management {
  @PrimaryGeneratedColumn()
  i009i_gerencia: number;

  @Column({ length: 255 })
  in_nombre: string;

  @Column({ length: 255 })
  tx_descripcion : string;
}
