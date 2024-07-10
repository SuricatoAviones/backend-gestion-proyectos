import { ApiProperty } from "@nestjs/swagger";
import { ProjectsPhase } from "src/projects-phase/entities/projects-phase.entity";
export class CreateTypeProjectDto {
  @ApiProperty()
  in_nombre: string;
  @ApiProperty()
  tx_descripcion: string;
  @ApiProperty()
  i011f_i012t_fase_proyecto: ProjectsPhase;
}
