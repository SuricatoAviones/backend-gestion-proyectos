import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdditionalDatumDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    tx_interfaz : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    tx_interconexion : string;

    @ApiProperty()
    @IsOptional()
    tx_datamodelo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    tx_seguridad : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    tx_comentario: string;

    
}
