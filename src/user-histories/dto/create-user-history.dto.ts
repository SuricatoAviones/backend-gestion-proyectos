import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";

export class CreateUserHistoryDto {
  @ApiProperty()
  co_historia: string;
  @ApiProperty()
  in_titulo: string;
  @ApiProperty()
  tx_descripcion: string;
  @ApiProperty()
  tx_rol: string;
  @ApiProperty()
  tx_funcionalidad: string;
  @ApiProperty()
  tx_criterio: string;
  @ApiProperty()
  i003i_entrada: Project;


}
