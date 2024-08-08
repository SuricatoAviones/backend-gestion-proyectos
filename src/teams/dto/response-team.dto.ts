import { Management } from "src/managements/entities/management.entity";
import { Team } from "../entities/team.entity";
import { ResponseManagementDto } from "src/managements/dto/response-management.dto";
import { User } from "src/users/entities/user.entity";
import { ResponseUserDto } from "src/users/dto/response-user.dto";

export class ResponseTeamDto {
    c008i_equipo_trabajo: number;
    in_cargo: string;
    c008f_i009t_gerencia_funcional: Management;
    c008f_i009t_gerencia_tecnica: Management;
    c008f_i009t_gerencia_galba: Management;
    c008f_i001t_lider_funcional: User;
    c008f_i001t_lider_negocio: User;
    c008f_i001t_lider_tecnico: User;
    c008f_i001t_trabajador: User[];

    constructor(data: Team) {
        this.c008i_equipo_trabajo = data.c008i_equipo_trabajo;
        this.in_cargo = data.in_cargo;
        this.c008f_i001t_lider_funcional = data.c008f_i001t_lider_funcional ? new ResponseUserDto(data.c008f_i001t_lider_funcional) : null;
        this.c008f_i001t_lider_negocio = data.c008f_i001t_lider_negocio ? new ResponseUserDto(data.c008f_i001t_lider_negocio) : null;
        this.c008f_i001t_lider_tecnico  =data.c008f_i001t_lider_tecnico ? new ResponseUserDto(data.c008f_i001t_lider_tecnico) : null;
        this.c008f_i001t_trabajador = data.c008f_i001t_trabajador? (data.c008f_i001t_trabajador) : null;
        this.c008f_i009t_gerencia_funcional = data.c008f_i009t_gerencia_funcional ? new ResponseManagementDto(data.c008f_i009t_gerencia_funcional) : null;
        this.c008f_i009t_gerencia_galba = data.c008f_i009t_gerencia_galba ? new ResponseManagementDto(data.c008f_i009t_gerencia_galba) : null;
        this.c008f_i009t_gerencia_tecnica = data.c008f_i009t_gerencia_tecnica  ? new ResponseManagementDto(data.c008f_i009t_gerencia_tecnica) : null
    }
}