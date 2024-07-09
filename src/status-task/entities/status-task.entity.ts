import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'i015t_estado_tarea'})

export class StatusTask {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    i015i_estado_tarea: number;
    @ApiProperty()
    @Column({ length: 255 })
    in_titulo: string;
    @ApiProperty()
    @Column({ length: 255 })
    tx_descripcion: string;
}
