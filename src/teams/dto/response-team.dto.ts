import { Management } from "src/managements/entities/management.entity";
import { Team } from "../entities/team.entity";
import { Worker } from "src/workers/entities/worker.entity";
import { ResponseManagementDto } from "src/managements/dto/response-management.dto";
import { ResponseWorkerDto } from "src/workers/dto/response-worker.dto";

export class ResponseTeamDto {
    c008i_equipo_trabajo: number;
    in_cargo: string;
    c008f_i009t_gerencia_funcional: Management;
    c008f_i009t_gerencia_tecnica: Management;
    c008f_i009t_gerencia_galba: Management;
    c008f_i001t_lider_funcional: Worker;
    c008f_i001t_lider_negocio: Worker;
    c008f_i001t_lider_tecnico: Worker;
    c008f_i001t_trabajador: Worker;

    constructor(data: Team) {
        this.c008i_equipo_trabajo = data.c008i_equipo_trabajo;
        this.in_cargo = data.in_cargo;
        this.c008f_i001t_lider_funcional = new ResponseWorkerDto(data.c008f_i001t_lider_funcional);
        this.c008f_i001t_lider_negocio =  new ResponseWorkerDto(data.c008f_i001t_lider_negocio);
        this.c008f_i001t_lider_tecnico = new ResponseWorkerDto(data.c008f_i001t_lider_tecnico);
        this.c008f_i001t_trabajador = new ResponseWorkerDto(data.c008f_i001t_trabajador);
        this.c008f_i009t_gerencia_funcional = new ResponseManagementDto(data.c008f_i009t_gerencia_funcional);
        this.c008f_i009t_gerencia_galba = new ResponseManagementDto(data.c008f_i009t_gerencia_galba);
        this.c008f_i009t_gerencia_tecnica = new ResponseManagementDto(data.c008f_i009t_gerencia_tecnica)
    }
}