import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateInputStatusDto {
    @ApiProperty()
    @IsString()
    in_nombre_estado: string;
    @ApiProperty()
    @IsString()
    tx_descripcion_estado: string;
}
