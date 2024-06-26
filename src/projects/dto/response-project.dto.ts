import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
import { Project } from "../entities/project.entity";
import { InputStatus } from "src/input-status/entities/input-status.entity";
import { UserHistory } from "src/user-histories/entities/user-history.entity";
import { Team } from "src/teams/entities/team.entity";
import { ResponseTeamDto } from "src/teams/dto/response-team.dto";
import { ResponseProjectsPhaseDto } from "src/projects-phase/dto/response-project-phase.dto";
import { ResponseInputStatusDto } from "src/input-status/dto/response-input-status.dto";
import { ResponseUserHistoryDto } from "src/user-histories/dto/response-user-history.dto";
import { TechnicalArea } from "src/technical-areas/entities/technical-area.entity";
import { TypeProject } from "src/type-projects/entities/type-project.entity";
import { ResponseTypeProjectDto } from "src/type-projects/dto/response-type-projects.dto";
import { ResponseTechnicalAreaDto } from "src/technical-areas/dto/technical-areas.dto";
import { AdditionalDatum } from "src/additional-data/entities/additional-datum.entity";
import { ResponseAdditionalDatumDto } from "src/additional-data/dto/response-additional-datum.dto";

export class ResponseProjectDto {
    i003i_entrada: number;
    co_entrada: string;
    i003f_i010t_area_tecnica: TechnicalArea;
    i003f_i011_tipo_proyecto: TypeProject;
    in_titulo: string;
    tx_descripcion: string;
    tx_objetivo: string;
    tx_alcance: string;
    i0003f_i008t_equipo_trabajo: Team;
    i003f_i005t_fase_entrada: ProjectsPhase;
    i003f_i006t_estado_entrada: InputStatus;
    i004i_datos_adi: AdditionalDatum

    constructor(data: Project) {
        this.i003i_entrada = data.i003i_entrada;
        this.co_entrada = data.co_entrada;
        this.i003f_i011_tipo_proyecto = new ResponseTypeProjectDto(data.i003f_i011_tipo_proyecto);
        this.i003f_i010t_area_tecnica = new ResponseTechnicalAreaDto(data.i003f_i010t_area_tecnica)
        this.in_titulo = data.in_titulo
        this.tx_descripcion = data.tx_descripcion;
        this.tx_alcance = data.tx_alcance;
        this.tx_objetivo = data.tx_objetivo;
        this.i0003f_i008t_equipo_trabajo =  new ResponseTeamDto(data.i0003f_i008t_equipo_trabajo)
        this.i003f_i005t_fase_entrada = new ResponseProjectsPhaseDto(data.i003f_i005t_fase_entrada);
        this.i003f_i006t_estado_entrada = new ResponseInputStatusDto(data.i003f_i006t_estado_entrada);
        this.i004i_datos_adi = new ResponseAdditionalDatumDto(data.i004i_datos_adi)
    }

}