import { AdditionalDatum } from "src/additional-data/entities/additional-datum.entity";
import { Team } from "src/teams/entities/team.entity";
import { TechnicalArea } from "src/technical-areas/entities/technical-area.entity";
import { TypeProject } from "src/type-projects/entities/type-project.entity";
import { Project } from "../entities/project.entity";
import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
import { InputStatus } from "src/input-status/entities/input-status.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty()
    co_entrada: string;
    @ApiProperty()
    in_titulo: string;
    @ApiProperty()
    tx_descripcion: string;
    @ApiProperty()
    tx_objetivo: string;
    @ApiProperty()
    tx_alcance: string;
    @ApiProperty()
    i003f_i005t_fase_entrada: ProjectsPhase;
    @ApiProperty()
    i003f_i010t_area_tecnica: TechnicalArea;
    @ApiProperty()
    i003f_i011_tipo_proyecto: TypeProject;
    @ApiProperty()
    i003f_i006t_estado_entrada: InputStatus;
    @ApiProperty()
    i0003f_i008t_equipo_trabajo: Team;
    @ApiProperty()
    i004i_datos_adi: AdditionalDatum;
}
