import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { Project } from "src/projects/entities/project.entity";

export class CreateUserHistoryDto {
  @ApiProperty()
  @IsString()
  co_historia: string;
  @ApiProperty()
  @IsString()
  in_titulo: string;
  @ApiProperty()
  @IsString()
  tx_descripcion: string;
  @ApiProperty()
  @IsString()
  tx_rol: string;
  @ApiProperty()
  @IsString()
  tx_funcionalidad: string;
  @ApiProperty()
  @IsString()
  tx_criterio: string;
  @ApiProperty()
  @IsNumber()
  @Type( () => Project)
  i003i_entrada: Project;


}
