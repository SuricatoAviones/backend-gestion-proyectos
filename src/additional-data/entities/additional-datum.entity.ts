import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity({ name: 'i004t_datos_adi' })
export class AdditionalDatum {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    i004i_datos_adi: number;

    @ApiProperty()
    @Column({ length: 255 })
    tx_interfaz: string;

    @ApiProperty()
    @Column({ length: 255 })
    tx_interconexion: string;

    @ApiProperty()
    @Column({ type: "bytea" })
    tx_datamodelo: Buffer;

    @ApiProperty()
    @Column({ length: 255 })
    tx_seguridad: string;
    
    @ApiProperty()
    @Column({ length: 255 })
    tx_comentario: string;
}
