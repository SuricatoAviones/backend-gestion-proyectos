import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePhaseInputDto {
  @ApiProperty()
  @IsString()
  in_nombre_fase : string;
  @ApiProperty()
  @IsString()
  tx_descripcion_fase : string;
}
