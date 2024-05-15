import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'i015t_estado_tarea'})

export class StatusTask {
    @PrimaryGeneratedColumn()
    i015i_estado_tarea: number;
  
    @Column({ length: 255 })
    in_titulo: string;
  
    @Column({ length: 255 })
    tx_descripcion: string;
}
