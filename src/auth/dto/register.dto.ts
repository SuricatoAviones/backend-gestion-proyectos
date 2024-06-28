import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";
export class RegisterDto{
    @IsEmail()
    in_correo: string;
    
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(4)
    password: string;
}