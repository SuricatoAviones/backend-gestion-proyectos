import { ApiProperty } from "@nestjs/swagger";

export class CreateAdditionalDatumDto {
    @ApiProperty()
    tx_interfaz : string;
    @ApiProperty()
    tx_interconexion : string;
    @ApiProperty()
    tx_datamodelo: Buffer;
    @ApiProperty()
    tx_seguridad : string;
    @ApiProperty()
    tx_comentario: string;
    
}
