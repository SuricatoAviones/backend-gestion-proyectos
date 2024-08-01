import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';

export class CreateUserHistoryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  co_historia: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  in_titulo: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  tx_descripcion: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  tx_rol: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  tx_funcionalidad: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  tx_criterio: string;
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Project)
  i013f_i003t_entrada: Project;
}
