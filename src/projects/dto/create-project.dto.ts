import { AdditionalDatum } from 'src/additional-data/entities/additional-datum.entity';
import { Team } from 'src/teams/entities/team.entity';
import { TechnicalArea } from 'src/technical-areas/entities/technical-area.entity';
import { TypeProject } from 'src/type-projects/entities/type-project.entity';
import { Project } from '../entities/project.entity';
import { ProjectsPhase } from 'src/projects-phase/entities/projects-phase.entity';
import { InputStatus } from 'src/input-status/entities/input-status.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { isArray, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Task } from 'src/tasks/entities/task.entity';
import { UserHistory } from 'src/user-histories/entities/user-history.entity';
import { Cost } from 'src/costs/entities/cost.entity';
import { PhaseInput } from 'src/phase-inputs/entities/phase-input.entity';

class PromedioMesDto {
  @ApiProperty()
  promedio: number;

  @ApiProperty()
  mes: Date; // O puedes usar un tipo Date si prefieres
}

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  co_entrada: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  in_titulo: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  tx_descripcion: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  tx_objetivo: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  tx_alcance: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => PhaseInput)
  i003f_i005t_fase_entrada: PhaseInput;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => TechnicalArea)
  i003f_i010t_area_tecnica: TechnicalArea;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => TypeProject)
  i003f_i011_tipo_proyecto: TypeProject;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => InputStatus)
  i003f_i006t_estado_entrada: InputStatus;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Team)
  i0003f_i008t_equipo_trabajo: Team;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => AdditionalDatum)
  i003f_i004t_datos_adi: AdditionalDatum;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Task)
  i003f_i013t_tareas: Task[];

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => UserHistory)
  i003f_i007i_historia_usuario: UserHistory[];

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Cost)
  i003f_i016i_costo: Cost[];

  @ApiProperty({ type: [PromedioMesDto], nullable: true })
  @Type(() => PromedioMesDto)
  @IsOptional()
  promedio_tareas_plan?: PromedioMesDto[];

  @ApiProperty({ type: [PromedioMesDto], nullable: true })
  @Type(() => PromedioMesDto)
  @IsOptional()
  promedio_tareas_real?: PromedioMesDto[];
}
