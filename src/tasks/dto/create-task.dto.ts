import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";

export class CreateTaskDto {
  tx_descripcion: string;
  description: string;
  i013f_i001t_usuario: User;
  i013f_i003t_entrada: Project;
}
