import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { Forum } from "src/forums/entity/forum.entity";
import { User } from "src/users/entities/user.entity";

export class CreateMessageDto {
    @ApiProperty()
    @IsString()
    tx_mensaje: string;
    @ApiProperty()
    @IsNumber()
    @Type( () => Forum)
    i018f_i019t_foro: Forum;
    @ApiProperty()
    @IsNumber()
    @Type( () => User)
    i018f_i001t_usuario: User;


}