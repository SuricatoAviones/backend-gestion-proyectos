import { Project } from "src/projects/entities/project.entity";
import { ResponseProjectDto } from "src/projects/dto/response-project.dto";
import { Cost } from "../entities/cost.entity";

export class ResponseCostDto {
    i016i_costo: number;
    i016f_i003t_entrada: Project;
    in_titulo: string;
    nu_monto: number;

    constructor (data: Cost) {
      this.i016f_i003t_entrada = new ResponseProjectDto(data.i016f_i003t_entrada)
      this.i016i_costo = data.i016i_costo;
      this.in_titulo = data.in_titulo;
      this.nu_monto = data.nu_monto;

    }
}