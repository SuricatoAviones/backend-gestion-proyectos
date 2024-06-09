import { Team } from "src/teams/entities/team.entity";
import { Worker } from "../entities/worker.entity";
import { ResponseTeamDto } from "src/teams/dto/response-team.dto";

export class ResponseWorkerDto {
    i017i_trabajador: number;
    in_nombre: string;
    tx_cargo: string;
    i017f_c008t_equipo_trabajo: Team; 

    constructor(data: Worker) {
        this.i017i_trabajador = data.i017i_trabajador;
        this.in_nombre = data.in_nombre;
        this.tx_cargo = data.tx_cargo;
        this.i017f_c008t_equipo_trabajo = new ResponseTeamDto(data.i017f_c008t_equipo_trabajo); 

    }
  
  }