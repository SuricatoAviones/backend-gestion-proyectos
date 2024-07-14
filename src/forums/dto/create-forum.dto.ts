import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { Project } from "src/projects/entities/project.entity";

export class CreateForumDto {
    @ApiProperty()
    @IsNumber()
    @Type( () => Project)
    i018f_i003t_entrada: Project;
}