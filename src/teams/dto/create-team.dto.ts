import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Management } from "src/managements/entities/management.entity";
import { User } from "src/users/entities/user.entity";


export class CreateTeamDto {
    @ApiProperty()
    @IsString()
    in_cargo: string;
    @ApiProperty()
    @IsNotEmpty()
    @Type( () => Management)
    c008f_i009t_gerencia_funcional: Management;
    @ApiProperty()
    @IsNotEmpty()
    @Type( () => Management)
    c008f_i009t_gerencia_tecnica: Management;
    @ApiProperty()
    @IsNotEmpty()
    @Type( () => Management)
    c008f_i009t_gerencia_galba: Management;
    @ApiProperty()
    @IsNotEmpty()
    @Type( () => User)
    c008f_i001t_lider_funcional: User;
    @ApiProperty()
    @IsNotEmpty()
    @Type( () => User)
    c008f_i001t_lider_negocio: User;
    @ApiProperty()
    @IsNotEmpty()
    @Type( () => User)
    c008f_i001t_lider_tecnico: User;
    @ApiProperty()
    @IsNotEmpty()
    @Type( () => User)
    c008f_i001t_trabajador: User;
}
