import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";

export class CreateCostDto {
    @ApiProperty()
    nu_monto: number;
    @ApiProperty()
    in_titulo : string;
    @ApiProperty()
    i016f_i003t_entrada : Project;
}
