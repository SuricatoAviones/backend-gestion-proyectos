import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateManagementDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    in_nombre: string;
    @ApiProperty()
    @IsString()
    tx_descripcion : string;
}
