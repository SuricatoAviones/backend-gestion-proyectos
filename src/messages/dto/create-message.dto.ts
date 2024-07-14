import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { Forum } from "src/forums/entity/forum.entity";
import { User } from "src/users/entities/user.entity";

export class CreateMessageDto {
    @ApiProperty()
    @IsString()
    tx_mensaje: string;
    @ApiProperty()
    @Type( () => Forum)
    i018f_i019t_foro: Forum;
    @ApiProperty()
    @Type( () => User)
    i018f_i001t_usuario: User;


}