import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto{
    @ApiProperty()
    @IsEmail()
    in_correo: string;
    @ApiProperty()
    @IsString()
    @MinLength(4)
    password: string;
    @ApiProperty()
    @IsString()
    in_usuario: string;
}