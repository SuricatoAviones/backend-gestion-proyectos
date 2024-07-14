import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateStatusTaskDto {
    @ApiProperty()
    @IsString()
    in_titulo: string;
    @ApiProperty()
    @IsString()
    tx_descripcion: string;

}
