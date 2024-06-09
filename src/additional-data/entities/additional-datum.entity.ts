import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity({ name: 'i004t_datos_adi' })
export class AdditionalDatum {
    @PrimaryGeneratedColumn()
    i004i_datos_adi: number;

    @Column({ length: 255 })
    tx_interfaz: string;

    @Column({ length: 255 })
    tx_interconexion: string;

    @Column({ type: "bytea" })
    tx_datamodelo: Buffer;

    @Column({ length: 255 })
    tx_seguridad: string;

    @Column({ length: 255 })
    tx_comentario: string;
}
