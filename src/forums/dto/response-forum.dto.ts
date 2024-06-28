import { Project } from "src/projects/entities/project.entity";
import { ResponseProjectDto } from "src/projects/dto/response-project.dto";
import { Forum } from "../entity/forum.entity";
import { Message } from "src/messages/entity/message.entity";
import { ResponseMessageDto } from "src/messages/dto/response-messages.dto";

export class ResponseForumDto {
    i018t_foro: number;
    i018f_i003t_entrada: Project;
    i018f_i019t_mensaje: Message[]

    constructor(data: Forum) {
        this.i018t_foro = data.i018t_foro;
        this.i018f_i003t_entrada =  new ResponseProjectDto(data.i018f_i003t_entrada)
        this.i018f_i019t_mensaje = data.i018f_i019t_mensaje.map(m => new ResponseMessageDto(m))
    }
}