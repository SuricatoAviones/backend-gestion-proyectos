import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { Project } from "src/projects/entities/project.entity";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    in_usuario: string;
    @ApiProperty()
    @IsString()
    in_nombre: string;
    @ApiProperty()
    @IsString()
    in_apellido: string;
    @ApiProperty()
    @IsEmail()
    in_correo: string;
    @ApiProperty()
    @IsString()
    in_role: string;
    @ApiProperty()
    @IsString()
    password: string;
    @ApiProperty()
    @IsString()
    foto: string;
}
