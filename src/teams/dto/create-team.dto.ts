import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Management } from "src/managements/entities/management.entity";
import { Worker } from "src/workers/entities/worker.entity";

export class CreateTeamDto {
    @ApiProperty()
    @IsString()
    in_cargo: string;
    @ApiProperty()
    @IsNumber()
    c008f_i009t_gerencia_funcional: Management;
    @ApiProperty()
    @IsNumber()
    c008f_i009t_gerencia_tecnica: Management;
    @ApiProperty()
    @IsNumber()
    c008f_i009t_gerencia_galba: Management;
    @ApiProperty()
    @IsNumber()
    c008f_i001t_lider_funcional: Worker;
    @ApiProperty()
    @IsNumber()
    c008f_i001t_lider_negocio: Worker;
    @ApiProperty()
    @IsNumber()
    c008f_i001t_lider_tecnico: Worker;
    @ApiProperty()
    @IsNumber()
    c008f_i001t_trabajador: Worker;
}
