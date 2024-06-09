import { ProjectsPhase } from "../entities/projects-phase.entity";

export class ResponseProjectsPhaseDto {
    i012i_fase_proyecto: number;
    in_nombre: string;
    tx_descripcion: string;

    constructor(data: ProjectsPhase) {
        this.i012i_fase_proyecto = data.i012i_fase_proyecto;
        this.in_nombre = data.in_nombre;
        this.tx_descripcion = data.tx_descripcion;
        }
  }