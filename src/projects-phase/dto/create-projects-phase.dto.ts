import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectsPhaseDto {
  @ApiProperty()
  in_nombre: string;
  @ApiProperty()
  tx_descripcion: string;
}
