import { ApiProperty } from "@nestjs/swagger";

export class CreateTechnicalAreaDto {
  @ApiProperty()
  in_nombre: string;
  @ApiProperty()
  tx_descripcion: string;

}
