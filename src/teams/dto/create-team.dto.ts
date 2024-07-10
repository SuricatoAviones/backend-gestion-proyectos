import { ApiProperty } from "@nestjs/swagger";
import { Management } from "src/managements/entities/management.entity";
import { Worker } from "src/workers/entities/worker.entity";

export class CreateTeamDto {
    @ApiProperty()
    in_cargo: string;
    @ApiProperty()
    c008f_i009t_gerencia_funcional: Management;
    @ApiProperty()
    c008f_i009t_gerencia_tecnica: Management;
    @ApiProperty()
    c008f_i009t_gerencia_galba: Management;
    @ApiProperty()
    c008f_i001t_lider_funcional: Worker;
    @ApiProperty()
    c008f_i001t_lider_negocio: Worker;
    @ApiProperty()
    c008f_i001t_lider_tecnico: Worker;
    @ApiProperty()
    c008f_i001t_trabajador: Worker;
}
