import { Project } from "src/projects/entities/project.entity";
import { ResponseProjectDto } from "src/projects/dto/response-project.dto";
import { Message } from "src/messages/entity/message.entity";
import { Forum } from "src/forums/entity/forum.entity";
import { User } from "src/users/entities/user.entity";
import { ResponseUserDto } from "src/users/dto/response-user.dto";
import { ResponseForumDto } from "src/forums/dto/response-forum.dto";

export class ResponseMessageDto {
    i019i_mensaje: number;
    i018f_i001t_usuario: User;
    tx_mensaje: string;
    i018f_i019t_foro: Forum
    createdAt: Date;

    constructor(data: Message) {
        this.i019i_mensaje = data.i019i_mensaje;
        this.i018f_i001t_usuario = new ResponseUserDto(data.i018f_i001t_usuario);
        this.i018f_i019t_foro = new ResponseForumDto(data.i018f_i019t_foro)
        this.tx_mensaje = data.tx_mensaje;
        this.createdAt = data.createdAt;
    }
}