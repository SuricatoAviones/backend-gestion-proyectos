import { Project } from "src/projects/entities/project.entity";
import { AdditionalDatum } from "../entities/additional-datum.entity";
import { ResponseProjectDto } from "src/projects/dto/response-project.dto";

export class ResponseAdditionalDatumDto {
    i004i_datos_adi: number;
    i004f_i003t_entradas : Project;
    tx_interfaz : string;
    tx_interconexion : string;
    tx_datamodelo: Buffer;
    tx_seguridad : string;
    tx_comentario: string;

    constructor(data: AdditionalDatum) {
        this.i004i_datos_adi = data.i004i_datos_adi;
        this.tx_interfaz = data.tx_interfaz;
        this.tx_interconexion = data.tx_interconexion;
        this.tx_datamodelo = data.tx_datamodelo;
        this.tx_seguridad = data.tx_seguridad;
        this.tx_comentario = data.tx_comentario;
    }
}
