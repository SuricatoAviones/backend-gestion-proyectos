import { AdditionalDatum } from "src/additional-data/entities/additional-datum.entity";
import { Team } from "src/teams/entities/team.entity";
import { TechnicalArea } from "src/technical-areas/entities/technical-area.entity";
import { TypeProject } from "src/type-projects/entities/type-project.entity";
import { Project } from "../entities/project.entity";
import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
import { InputStatus } from "src/input-status/entities/input-status.entity";

export class CreateProjectDto {
    co_entrada: string;
    in_titulo: string;
    tx_descripcion: string;
    tx_objetivo: string;
    tx_alcance: string;
    i003f_i005t_fase_entrada: ProjectsPhase;
    i003f_i010t_area_tecnica: TechnicalArea;
    i003f_i011_tipo_proyecto: TypeProject;
    i003f_i006t_estado_entrada: InputStatus;
    i0003f_i008t_equipo_trabajo: Team;
    i004i_datos_adi: AdditionalDatum;
}
