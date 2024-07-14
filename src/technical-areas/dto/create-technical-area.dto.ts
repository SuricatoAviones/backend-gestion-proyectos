import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTechnicalAreaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  in_nombre: string;
  @ApiProperty()
  @IsString()
  tx_descripcion: string;

}
