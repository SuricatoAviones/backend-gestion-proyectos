import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdditionalDatumDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tx_interfaz : string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tx_interconexion : string;
    @ApiProperty()
    @IsString()
    tx_datamodelo: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tx_seguridad : string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tx_comentario: string;
    
}
