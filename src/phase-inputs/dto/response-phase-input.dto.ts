import { PhaseInput } from "../entities/phase-input.entity";

export class ResponsePhaseInputDto {
    i0005i_fase_entrada: number;
    in_nombre_fase : string;
    tx_descripcion_fase : string;

    constructor(data: PhaseInput) {
        this.i0005i_fase_entrada = data.i0005i_fase_entrada;
        this.in_nombre_fase = data.in_nombre_fase;
        this.tx_descripcion_fase = data.tx_descripcion_fase;
    }
  }

  