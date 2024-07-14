import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Project } from "src/projects/entities/project.entity";

export class CreateForumDto {
    @ApiProperty()
    @Type( () => Project)
    i018f_i003t_entrada: Project;
}