import { Project } from "src/projects/entities/project.entity";

export class CreateUserDto {
    in_usuario: string;
    in_nombre: string;
    in_apellido: string;
    in_correo: string;
    in_role: string;
    password: string;
    foto: string;
}
