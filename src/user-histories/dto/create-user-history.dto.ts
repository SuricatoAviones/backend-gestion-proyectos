import { Project } from "src/projects/entities/project.entity";

export class CreateUserHistoryDto {
  co_historia: string;
  in_titulo: string;
  tx_descripcion: string;
  tx_rol: string;
  tx_funcionalidad: string;
  tx_criterio: string;
  i003i_entrada: Project;


}
