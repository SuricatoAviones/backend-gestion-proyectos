import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Project } from "src/projects/entities/project.entity";

export class CreateForumDto {
    @ApiProperty()
    @IsNotEmpty()
    @Type( () => Project)
    i018f_i003t_entrada: Project;
}