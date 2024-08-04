import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { Transform, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
export class RegisterDto{
    @ApiProperty()
    @IsEmail()
    in_correo: string;

    @ApiProperty()
    @IsString()
    @MinLength(4)
    password: string;

    @ApiProperty()
    @IsOptional()
    @Type(()=> Buffer)
    foto: string;

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
    @IsString()
    in_role: string;
}