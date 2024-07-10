import { ApiProperty } from "@nestjs/swagger";

export class CreateStatusTaskDto {
    @ApiProperty()
    in_titulo: string;
    @ApiProperty()
    tx_descripcion: string;

}
