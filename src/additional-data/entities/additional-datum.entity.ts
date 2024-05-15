import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity({name:'i004t_datos_adi'})
export class AdditionalDatum {
    @PrimaryGeneratedColumn()
    i004i_datos_adi: number;
  
    @OneToMany(() => Project, (project) => project.i003i_entrada)
    i004f_i003t_entradas : Project[];
  
    @Column({ length: 255 })
    tx_interfaz : string;
  
    @Column({ length: 255 })
    tx_interconexion : string;
  
    @Column({ type: "longblob" })
    tx_datamodelo: Buffer;
  
    @Column({ length: 255 })
    tx_seguridad : string;
  
    @Column({ length: 255 })
    tx_comentario: string;
}
