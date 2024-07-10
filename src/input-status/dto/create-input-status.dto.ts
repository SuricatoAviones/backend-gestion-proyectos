import { ApiProperty } from "@nestjs/swagger";

export class CreateInputStatusDto {
    @ApiProperty()
    in_nombre_estado: string;
    @ApiProperty()
    tx_descripcion_estado: string;
}
