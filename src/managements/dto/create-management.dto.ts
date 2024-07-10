import { ApiProperty } from "@nestjs/swagger";

export class CreateManagementDto {
    @ApiProperty()
    in_nombre: string;
    @ApiProperty()
    tx_descripcion : string;
}
