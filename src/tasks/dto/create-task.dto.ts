import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";

export class CreateTaskDto {
  @ApiProperty()
  tx_descripcion: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  i013f_i001t_usuario: User;
  @ApiProperty()
  i013f_i003t_entrada: Project;
}
