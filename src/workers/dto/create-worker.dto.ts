import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Team } from "src/teams/entities/team.entity";

export class CreateWorkerDto {
  @ApiProperty()
  @IsString()
  in_nombre: string;
  @ApiProperty()
  @IsString()
  tx_cargo: string;
  @ApiProperty()
  @IsNotEmpty()
  @Type( () => Team)
  i017f_c008t_equipo_trabajo: Team; 
}
