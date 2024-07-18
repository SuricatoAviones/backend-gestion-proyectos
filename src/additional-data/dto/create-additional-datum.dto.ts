import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
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
    @Type(()=> Buffer)
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
