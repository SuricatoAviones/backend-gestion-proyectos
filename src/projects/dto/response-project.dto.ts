import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
import { Project } from "../entities/project.entity";
import { InputStatus } from "src/input-status/entities/input-status.entity";
import { UserHistory } from "src/user-histories/entities/user-history.entity";
import { Team } from "src/teams/entities/team.entity";
import { ResponseTeamDto } from "src/teams/dto/response-team.dto";
import { ResponseProjectsPhaseDto } from "src/projects-phase/dto/response-project-phase.dto";
import { ResponseInputStatusDto } from "src/input-status/dto/response-input-status.dto";
import { ResponseUserHistoryDto } from "src/user-histories/dto/response-user-history.dto";
import {ResponsePhaseInputDto} from "src/phase-inputs/dto/response-phase-input.dto"
import { TechnicalArea } from "src/technical-areas/entities/technical-area.entity";
import { TypeProject } from "src/type-projects/entities/type-project.entity";
import { ResponseTypeProjectDto } from "src/type-projects/dto/response-type-projects.dto";
import { ResponseTechnicalAreaDto } from "src/technical-areas/dto/technical-areas.dto";
import { AdditionalDatum } from "src/additional-data/entities/additional-datum.entity";
import { ResponseAdditionalDatumDto } from "src/additional-data/dto/response-additional-datum.dto";
import { Task } from "src/tasks/entities/task.entity";
import { ResponseTaskDto } from "src/tasks/dto/response-task.dto";
import { Cost } from "src/costs/entities/cost.entity";

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
    i003f_i005t_fase_entrada: any;
    i003f_i006t_estado_entrada: InputStatus;
    i003f_i004t_datos_adi: AdditionalDatum;
    i003f_i013t_tareas: Task[];
    i003f_i007i_historia_usuario: UserHistory[];
    i003f_i016i_costo: Cost[];
    deletedAt: Date;
    createdAt: Date;
    constructor(data: Project) {
        this.i003i_entrada = data.i003i_entrada;
        this.co_entrada = data.co_entrada;
        this.i003f_i011_tipo_proyecto = data.i003f_i011_tipo_proyecto ? new ResponseTypeProjectDto(data.i003f_i011_tipo_proyecto) : null;
        this.i003f_i010t_area_tecnica = data.i003f_i010t_area_tecnica ? new ResponseTechnicalAreaDto(data.i003f_i010t_area_tecnica): null;
        this.in_titulo = data.in_titulo;
        this.tx_descripcion = data.tx_descripcion;
        this.tx_alcance = data.tx_alcance;
        this.tx_objetivo = data.tx_objetivo;
        this.i0003f_i008t_equipo_trabajo = data.i0003f_i008t_equipo_trabajo ? new ResponseTeamDto(data.i0003f_i008t_equipo_trabajo): null;
        this.i003f_i005t_fase_entrada = data.i003f_i005t_fase_entrada ? new ResponsePhaseInputDto(data.i003f_i005t_fase_entrada): null;
        this.i003f_i006t_estado_entrada = data.i003f_i006t_estado_entrada ? new ResponseInputStatusDto(data.i003f_i006t_estado_entrada) : null;
        this.i003f_i004t_datos_adi = data.i003f_i004t_datos_adi ? new ResponseAdditionalDatumDto(data.i003f_i004t_datos_adi) : null;
        this.i003f_i013t_tareas = data.i003f_i013t_tareas; 
        this.i003f_i007i_historia_usuario = data.i003f_i007i_historia_usuario ;
        this.i003f_i016i_costo = data.i003f_i016i_costo;
        this.deletedAt = data.deletedAt;
        this.createdAt = data.createdAt;
    }

}
