import { AdditionalDatum } from "src/additional-data/entities/additional-datum.entity";
import { Team } from "src/teams/entities/team.entity";
import { TechnicalArea } from "src/technical-areas/entities/technical-area.entity";
import { TypeProject } from "src/type-projects/entities/type-project.entity";
import { Project } from "../entities/project.entity";
import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
import { InputStatus } from "src/input-status/entities/input-status.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class CreateProjectDto {
    @ApiProperty()
    @IsString()
    co_entrada: string;
    @ApiProperty()
    @IsString()
    in_titulo: string;
    @ApiProperty()
    @IsString()
    tx_descripcion: string;
    @ApiProperty()
    @IsString()
    tx_objetivo: string;
    @ApiProperty()
    @IsString()
    tx_alcance: string;
    @ApiProperty()
    @Type( () => ProjectsPhase)
    i003f_i005t_fase_entrada: ProjectsPhase;
    @ApiProperty()
    @Type( () => TechnicalArea)
    i003f_i010t_area_tecnica: TechnicalArea;
    @ApiProperty()
    @Type( () => TypeProject)
    i003f_i011_tipo_proyecto: TypeProject;
    @ApiProperty()
    @Type( () => InputStatus)
    i003f_i006t_estado_entrada: InputStatus;
    @ApiProperty()
    @Type( () => Team)
    i0003f_i008t_equipo_trabajo: Team;
    @ApiProperty()
    @Type( () => AdditionalDatum)
    i004i_datos_adi: AdditionalDatum;
}
