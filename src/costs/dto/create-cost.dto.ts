import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { Project } from "src/projects/entities/project.entity";

export class CreateCostDto {
    @ApiProperty()
    @IsNumber()
    nu_monto: number;
    @ApiProperty()
    @IsString()
    in_titulo : string;
    @ApiProperty()
    @Type( () => Project)
    i016f_i003t_entrada : Project;
}
