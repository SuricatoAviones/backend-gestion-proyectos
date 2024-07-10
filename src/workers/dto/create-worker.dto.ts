import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/teams/entities/team.entity";

export class CreateWorkerDto {
  @ApiProperty()
  in_nombre: string;
  @ApiProperty()
  tx_cargo: string;
  @ApiProperty()
  i017f_c008t_equipo_trabajo: Team; 
}
