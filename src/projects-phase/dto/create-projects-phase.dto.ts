import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProjectsPhaseDto {
  @ApiProperty()
  @IsString()
  in_nombre: string;
  @ApiProperty()
  @IsString()
  tx_descripcion: string;
}
