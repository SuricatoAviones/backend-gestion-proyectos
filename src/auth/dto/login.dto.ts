import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  password: string;
  @ApiProperty()
  @IsString()
  in_usuario: string;
}
