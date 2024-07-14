import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  tx_descripcion: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNumber()
  @Type( () => User)
  i013f_i001t_usuario: User;
  @ApiProperty()
  @IsNumber()
  @Type( () => Project)
  i013f_i003t_entrada: Project;
}
