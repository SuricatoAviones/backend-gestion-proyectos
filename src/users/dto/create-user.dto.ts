import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsString } from "class-validator";
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
    @IsOptional()
    in_role!: string;
    
    @ApiProperty()
    @IsString()
    password: string;
    @ApiProperty()
    @Type(()=> Buffer)
    foto: string;
}
