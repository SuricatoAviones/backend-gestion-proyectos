import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/entities/project.entity";

export class CreateForumDto {
    @ApiProperty()
    i018f_i003t_entrada: Project;
}