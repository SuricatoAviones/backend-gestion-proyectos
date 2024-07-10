import { ApiProperty } from "@nestjs/swagger";

export class CreatePhaseInputDto {
  @ApiProperty()
  in_nombre_fase : string;
  @ApiProperty()
  tx_descripcion_fase : string;
}
