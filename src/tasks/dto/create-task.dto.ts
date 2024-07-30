import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Project } from "src/projects/entities/project.entity";
import { Tracking } from "src/trackings/entities/tracking.entity";
import { User } from "src/users/entities/user.entity";

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  tx_descripcion: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  @Type( () => User)
  i013f_i001t_usuario: User;
  @ApiProperty()
  @IsNotEmpty()
  @Type( () => Project)
  i013f_i003t_entrada: Project;

  @ApiProperty()
  @IsOptional()
  @Type( () => Tracking)
  i013f_i014t_seguimiento: Tracking
}
