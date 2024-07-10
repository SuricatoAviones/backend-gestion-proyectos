import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";

export class CreateUserDto {
    @ApiProperty()
    in_usuario: string;
    @ApiProperty()
    in_nombre: string;
    @ApiProperty()
    in_apellido: string;
    @ApiProperty()
    in_correo: string;
    @ApiProperty()
    in_role: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    foto: string;
}
