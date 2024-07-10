import { ApiProperty } from "@nestjs/swagger";
import { Forum } from "src/forums/entity/forum.entity";
import { User } from "src/users/entities/user.entity";

export class CreateMessageDto {
    @ApiProperty()
    tx_mensaje: string;
    @ApiProperty()
    i018f_i019t_foro: Forum;
    @ApiProperty()
    i018f_i001t_usuario: User;


}