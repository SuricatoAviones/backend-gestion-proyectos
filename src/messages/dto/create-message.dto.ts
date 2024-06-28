import { Forum } from "src/forums/entity/forum.entity";
import { User } from "src/users/entities/user.entity";

export class CreateMessageDto {
    tx_mensaje: string;
    i018f_i019t_foro: Forum;
    i018f_i001t_usuario: User;


}