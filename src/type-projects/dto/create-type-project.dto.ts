import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
export class CreateTypeProjectDto {
  @ApiProperty()
  @IsString()
  in_nombre: string;
  @ApiProperty()
  @IsString()
  tx_descripcion: string;
  @ApiProperty()
  @IsNumber()
  @Type( () => ProjectsPhase)
  i011f_i012t_fase_proyecto: ProjectsPhase;
}
