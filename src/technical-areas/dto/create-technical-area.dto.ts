import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTechnicalAreaDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  in_nombre: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  tx_descripcion: string;

}
