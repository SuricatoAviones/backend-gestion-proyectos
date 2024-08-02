import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Project } from "src/projects/entities/project.entity";

export class CreateCostDto {
    @ApiProperty()
    @IsOptional()

    @IsNumber()
    nu_monto: number;
    @ApiProperty()
    @IsOptional()

    @IsString()
    in_titulo : string;
    @ApiProperty()
    @IsOptional()

    @IsNotEmpty()
    @Type( () => Project)
    i016f_i003t_entrada : Project;
}
