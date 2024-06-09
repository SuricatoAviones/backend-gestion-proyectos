import { Management } from "src/managements/entities/management.entity";
import { Worker } from "src/workers/entities/worker.entity";

export class CreateTeamDto {
    in_cargo: string;
    c008f_i009t_gerencia_funcional: Management;
    c008f_i009t_gerencia_tecnica: Management;
    c008f_i009t_gerencia_galba: Management;
    c008f_i001t_lider_funcional: Worker;
    c008f_i001t_lider_negocio: Worker;
    c008f_i001t_lider_tecnico: Worker;
    c008f_i001t_trabajador: Worker;
}
