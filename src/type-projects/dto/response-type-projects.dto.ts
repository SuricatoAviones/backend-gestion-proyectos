import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
import { TypeProject } from "../entities/type-project.entity";
import { ResponseProjectsPhaseDto } from "src/projects-phase/dto/response-project-phase.dto";

export class ResponseTypeProjectDto {
    i011i_tipo_proyecto: number;
    i011f_i012t_fase_proyecto: ProjectsPhase;
    in_nombre: string;
    tx_descripcion: string;
    

    constructor(data: TypeProject) {
        this.i011i_tipo_proyecto = data.i011i_tipo_proyecto;
        this.i011f_i012t_fase_proyecto = new ResponseProjectsPhaseDto(data.i011f_i012t_fase_proyecto)
        this.in_nombre = data.in_nombre;
        this.tx_descripcion = data.tx_descripcion;
    }
  }
  